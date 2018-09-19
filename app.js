app.post('/webhook', function (req,res){
    console.log('received a post request');
    if (!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type','application/json');
    console.log('here is the post requst from Dialogflow');
    console.log(req.body);
    console.log('got geo city parameter from dialogflow' + req.body.queryResult.parameters['geo-city']);
    var city = req.body.queryResult.parameters['geo-city'];
    var w = getWeather('city');
    let response = "";
    let responseObj={
                        "fulfillmentText":response
                        ,"fulfillmentMessage":[{"text":{"text":[w]}}]
                        ,"source":""
    }
    console.log('here is the resoponse to dialogflow');
    console.log(responseObj);
    return res.json(responseObj);
}
)


var apiKey = '86d7b0c4702dd2356ff6605b6c37a509';
var result


function cb (err, response, error) {
    if(err){
        console.log('error:',error);
    }
    var weather = JSON.parse(body)
    if (weather.message === 'city not found')
    {
        result= 'Unable to get weather' + weather.message;
    }
    else
    {
        result='Right now its '+weather.main.temp+ 'degrees with' +weather.weather[0].description;
    }
}


function getWeather(city){
    result= undefined;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    console.log(url);
    var req =requst(url,cb);
    while(result === undefined){
        require('deasync').runLoopOnce();
    }
    return result;
}

