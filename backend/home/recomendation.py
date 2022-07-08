from django.conf import settings
from .models import Books,Users
from django.core.mail import send_mail
from django.conf import settings

import pandas as pd
import numpy as np
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import RegexpTokenizer
import re
import string
import random
import nltk
from sklearn.metrics.pairwise import cosine_similarity



# Function for removing NonAscii characters
def removeNonAscii(s):
    return "".join(i for i in s if  ord(i)<128)

# Function for converting into lower case
def make_lower_case(text):
    return text.lower()

# Function for removing stop words
def remove_stop_words(text):
    text = text.split()
    stops = set(stopwords.words("english"))
    text = [w for w in text if not w in stops]
    text = " ".join(text)
    return text

# Function for removing punctuation
def remove_punctuation(text):
    tokenizer = RegexpTokenizer(r'\w+')
    text = tokenizer.tokenize(text)
    text = " ".join(text)
    return text

#Function for removing the html tags
def remove_html(text):
    html_pattern = re.compile('<.*?>')
    return html_pattern.sub(r'', text)

def cleaner(text):
    text = removeNonAscii(text)
    text = make_lower_case(text)
    text = remove_html(text)
    text = remove_punctuation(text)
    text = remove_stop_words(text)
    return text




def bookCleaner(books):
    features = []
    for book in books:
        book_parameters = []
        book_parameters.append(cleaner(book.description))
        book_parameters.append(cleaner(book.bookname))
        book_parameters.append(cleaner(book.author))
        book_parameters.append(cleaner(book.publisher))
        book_parameters.append(cleaner(book.category))

        features.append(book_parameters)
    
    return features



    
        
def profileBasedRecommendation(books,features,user):
    user_interests = cleaner(user.interests)
    searchHistory  = cleaner(user.searchHistory)
    user_interests = user_interests.split()
    searchHistory = searchHistory.split()
    print(searchHistory)
    cosine_similarities = []
    for feature in features:
        tf = TfidfVectorizer(analyzer='word', min_df = 1)
        feature_matrix = tf.fit_transform(feature)
        interest_matrix = tf.transform(user_interests)
        interests_similarity = cosine_similarity(feature_matrix,interest_matrix)
        interests_similarity = max(interests_similarity[:,0])
        if len(searchHistory)>0:
            searchHistory_matrix = tf.transform(searchHistory)
            searchHistory_similarity = cosine_similarity(feature_matrix,searchHistory_matrix)
        cosine_similarities.append(interests_similarity)
    
        
    return cosine_similarities
    

def recommend(books,id):
    user = Users.objects.filter(id = id)
    recommend_list = []
    nltk.download('stopwords')
    features = bookCleaner(books)
    print(features)
    cosine_similarities = profileBasedRecommendation(books,features,user[0])
    print(cosine_similarities)
    sorted_books = [x for _,x in sorted(zip(cosine_similarities,books),reverse=True, key = lambda x: x[0])]
    print(sorted_books)
    return sorted_books





def sendMail(book):
    users = Users.objects.all()
    emails = []
    for user in users:
        if book['bookname'] in user.interests or book['bookname'] in user.searchHistory:
            emails.append(user.email)
    print(emails)

    send_mail('Book you were looking for',book['bookname']+'is up for sale, buy it before somebody else does, Regards Pusthak Bandaar',settings.EMAIL_HOST_USER,emails)