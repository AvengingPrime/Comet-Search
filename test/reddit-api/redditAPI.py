import pickle
import spacy
nlp = spacy.load('en_core_web_lg')
import praw
from flask import Flask
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

reddit = praw.Reddit(
    client_id = 'b74ZiwXVctbx1alAwQkicw',
    client_secret = 'fiEGVnSyEWQVqpXptXqENbedRqkfaw',
    user_agent = 'js:CometSearch v1.0 (by /u/hack-utd-9-throwaway)'
)

def cleanComments(posts):
    # posts = pickle.load(open('posts.pb', mode= 'rb'))
    
    for post in posts:
        comments = posts[post]['comments']
        comments = comments[:3] 
        posts[post]['comments'] = [comment.body for comment in comments]
        # print(posts[post]['comments'])
        
    return posts

# reddit client id: b74ZiwXVctbx1alAwQkicw
# reddit secret: fiEGVnSyEWQVqpXptXqENbedRqkfaw
# reddit user agent: js:CometSearch v1.0 (by /u/hack-utd-9-throwaway)

def fetchNewRedditData():
    utdReddit = reddit.subreddit('utdallas')
    newPosts = utdReddit.new(limit = 10)
    count = 0
    allPosts = pickle.load(open('C:/Users/Vivian/Coding/HackUTD/Comet-Search/test/reddit-api/posts.pb', mode= 'rb'))
    posts = {}
    
    for submission in newPosts:
        # submission = utdReddit.random()
        # print('here 1')
        temp = {
            'title': submission.title,
            'url': submission.url,
            'comments': submission.comments,
            'numComments':submission.num_comments,
            'text': submission.selftext,
            'flair': submission.link_flair_text,
            'time': submission.created_utc
        }
        # print('here 2')
        count += 1
        # print('here 3')
        
        if temp['time'] < 1420092000 or temp['flair'] == 'Meme' or temp['flair'] == 'Art' or temp['flair'] == 'Lost and Found' or temp['numComments'] == 0:
            continue
        
        if submission.created_utc in posts:
            break;
        
        posts[submission.created_utc] = temp
        # print(count, submission.id)    
    
    posts = cleanComments(posts)
    
    allPosts.update(posts)
    
    pickle.dump(allPosts, open("C:/Users/Vivian/Coding/HackUTD/Comet-Search/test/reddit-api/posts.pb", mode='wb'))
    
    return allPosts

@app.route('/query/<query>')
def getPosts(query):
    query= ' '.join(query.split('-'))
    posts = pickle.load(open("C:/Users/Vivian/Coding/HackUTD/Comet-Search/test/reddit-api/posts.pb", mode='rb'))
    qry = nlp(query)
    # posts = pickle.load(open('posts.pb', mode= 'rb'))
    similarity = {0 : [None, 0], 1: [None, 0], 2:[None, 0]}
    
    for post in posts:
        # print('here')
        postTitle = nlp(posts[post]['title'])
        # print(posts[post]['title'])
        sim = qry.similarity(postTitle)
        # print(sim)
        
        if sim > similarity[0][1]:
            similarity[0], similarity[1], similarity[2] = [posts[post], sim],similarity[0], similarity[1]
        elif sim > similarity[1][1]:
            similarity[0], similarity[1], similarity[2] = similarity[0], [posts[post], sim], similarity[1]
        elif sim > similarity[2][1]:
            similarity[0], similarity[1], similarity[2] = similarity[0], similarity[1], [posts[post], sim]
        
    result = [similarity[p][0] for p in similarity]
    
    return jsonify({'posts' : result})
        
@app.route("/")
def hello():
    # fetchNewRedditData()
    return jsonify({'message': 'Hello!'})

@app.route("/query")
def allPosts():
    posts = pickle.load(open('C:/Users/Vivian/Coding/HackUTD/Comet-Search/test/reddit-api/posts.pb', mode= 'rb'))
    return jsonify({'posts' : posts})

if __name__ == "__main__":
    # print()
    app.run(host='localhost', port=5000)
    # print(getPosts())
    # makeRedditData()
    # redditdb = pickle.load(open('posts.pb', mode='rb'))
    # print(len(redditdb))