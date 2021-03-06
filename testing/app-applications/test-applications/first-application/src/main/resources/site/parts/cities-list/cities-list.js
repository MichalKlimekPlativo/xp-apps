var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var contentSvc = require('/lib/xp/content');

var view = resolve('cities-list.page.html');

function handleGet(req) {

    var currentCityName;
    var cities;

    if (req.params.city) {
        var city = getCity(req.params.city);
        if (city) {
            currentCityName = city.displayName;
            cities = contentSvc.query({
                    start: 0,
                    count: 25,
                    contentTypes: [
                        app.name + ':city'
                    ],
                    "sort": "geoDistance('data.cityLocation','" + city.data.cityLocation + "')",
                    "query": "_name != '" + currentCityName + "'"
                }
            );
        }
    }

    if (!currentCityName) {
        currentCityName = "Select";
    }

    if (!cities) {
        cities = contentSvc.query({
                start: 0,
                count: 25,
                contentTypes: [
                    app.name + ':city'
                ]
            }
        );
    }

    var content = portal.getContent();
    var currentPage = portal.pageUrl({
        path: content._path
    });

    var part = portal.getComponent();
    var title = part.config.title || '<please configure title>';

    var params = {
        cities: cities.hits,
        currentCity: currentCityName,
        currentPage: currentPage,
        title: title
    };
    var body = thymeleaf.render(view, params);

    function getCity(cityName) {
        var result = contentSvc.query({
                count: 1,
                contentTypes: [
                    app.name + ':city'
                ],
                "query": "_name = '" + cityName + "'"
            }
        );

        return result.hits[0];
    }

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;