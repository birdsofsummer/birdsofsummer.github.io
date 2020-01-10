const
    cheerio = require('cheerio'),
    axios = require('axios'),
	superagent = require('superagent'),
	async = require('async'),
	fs = require('fs'),
	url = require('url'),
	douban={
		erzu:"https://www.douban.com/group/blabla/discussion?start=",
		zufang:"https://www.douban.com/group/498004/discussion?start=",
		movie:"",
	},
	group_details={
		autorlink:".topic-content>.user-face>a",
		author:'.from>a',
		time:'.topic-doc>h3>.color-green',
		title:'#content>h1',
		content:'.topic-richtext>p',
		img:'.image-wrapper>img',
	},
	movie_details={
		votes:'[property="v:votes"]',
		stars5:'.stars5 ~ .rating_per',
		stars4:'.stars4 ~ .rating_per',
		stars3:'.stars3 ~ .rating_per',
		stars2:'.stars2 ~ .rating_per',
		stars1:'.stars1 ~ .rating_per',
	};



