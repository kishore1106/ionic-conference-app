/**
 * Created by SelotSoft on 3/4/2015.
 */

describe("Should index page loads all files properly", function () {

    var configuration;

    beforeEach(function () {
        configuration = {
            e2eTests: {
                url: "http://localhost:3000"
            }
        }
    });

    it("should all link files loaded", function () {
        browser.get(configuration.e2eTests.url);
        var items = element.all(By.css('.ctl-app-hdr link')).map(function (elm, index) {
            return {index: index, href: elm.getAttribute('href')};
        });
        expect(items).toEqual([
            {
                index: 0,
                href: 'http://localhost:3000/public/assets/css/external/bootstrap/bootstrap.dropdown.css'
            },
            {
                index: 1,
                href: 'http://localhost:3000/public/assets/css/external/angular/angular-material-0.9.0.css'
            },
            {index: 2, href: 'http://localhost:3000/public/assets/css/internal/core/core.css'},
            {
                index: 3,
                href: 'http://localhost:3000/public/assets/css/internal/skin/animation.css'
            },
            {
                index: 4,
                href: 'http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,900italic,900,700italic,700,500italic,500,400italic'
            },
            {
                index: 5,
                href: 'http://localhost:3000/public/assets/css/external/ionicons/ionicons.min.css'
            },
            {
                index: 6,
                href: 'http://localhost:3000/public/assets/css/external/bootstrap/bootstrap.tooltip.css'
            },
            {
                index: 7,
                href: 'http://localhost:3000/public/assets/css/external/bootstrap/bootstrap.alert.css'
            },
            {
                index: 8,
                href: 'http://localhost:3000/public/assets/css/external/bootstrap/bootstrap.progressbar.css'
            },
            {
                index: 9,
                href: 'http://localhost:3000/public/assets/css/external/toast/ngToast-animations.css'
            },
            {index: 10, href: 'http://localhost:3000/public/assets/css/external/toast/ngToast.css'}
        ]);
    });

    it("should all src files loaded", function () {
        browser.get(configuration.e2eTests.url);
        var items = element.all(by.css('.ctl-app-bdy script')).map(function (elm, index) {
            return {
                index: index,
                src: elm.getAttribute('src')
            };
        });
        expect(items).toEqual([
            {index: 0, src: 'http://localhost:3000/public/assets/lib/require/require.js'},
            {
                index: 1,
                src: 'http://code.jquery.com/jquery-1.11.2.min.js'
            },
            {index: 2, src: ''}
        ]);
    });
});
