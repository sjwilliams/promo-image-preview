const body = document.body;
const messageEl = document.createElement('div');
const message = [];


const textElMaker = (text, type) => {
	type = type || 'p';
	const el = document.createElement(type);
	el.innerHTML = text;
	return el;
};

const pMaker = (text) => {
	const el = textElMaker(text);
	el.style.fontSize = '1rem';
	return el;
};

const hedMaker = (text) => {
	const el = textElMaker(text, 'h2');
	el.style.fontSize = '2rem';
	el.style.margin = '2rem 0 1rem 0';
	return el;
};

const imageMaker = (url) => {
	const el = document.createElement('img');
	el.src = url;
	el.style.display = 'block';
	el.style.width = '400px';
	el.style.margin = '0.5rem 0';
	return el;
};

const reduceFraction = (numerator,denominator) =>{
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}

// Google compatible images
const structuredData = [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) => JSON.parse(el.text));
const articles = structuredData.filter((d) => d['@type'] === 'NewsArticle' );

if(!!articles.length && !!articles[0].image && !!articles[0].image.length){	
	message.push(hedMaker('LD+JSON/Google Search'));

	articles.forEach((article) => {
		const images = article.image;
		images.forEach((img) => {
			const {url, width, height} = img;
			message.push(imageMaker(url));

			const reduced = reduceFraction(width, height);
			message.push(pMaker(`Found ${width}px x ${height}px (${reduced[0]}x${reduced[1]}) image`));
		});
	});
}

message.forEach((el) => {
	messageEl.append(el);
});

body.appendChild(messageEl);
messageEl.style.zIndex = 2147483647;
messageEl.style.position = "fixed";
messageEl.style.top = "0";
messageEl.style.right = "0";
messageEl.style.fontFamily = "Arial, sans-serif";
messageEl.style.backgroundColor = "#f4ff60";
messageEl.style.color = '#000000';
messageEl.style.padding = "20px 20px 20px 20px";
console.log(message);