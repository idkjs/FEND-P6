(function() {
    'use strict'; 
    $(function() {
        /* This is our first test suite - a test suite just contains
         * a related set of tests. This suite is all about the RSS
         * feeds definitions, the allFeeds variable in our application.
         */
        describe('RSS Feeds', function() {
            /* This is our first test - it tests to make sure that the
             * allFeeds variable has been defined and that it is not
             * empty. The second test, checks for the allFeed items 
             * have a defined, non null url.
             */
            it('are defined', function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });

            /* This test loops through each key in the allFeeds object and 
             * ensures it has a name, url defined and that the name and url
             * are not undefined or not empty strings.
             */

            it('has url defined and the url field is not empty', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed.url).toBeDefined();
                    expect(feed.url).not.toBe(null);
                    expect(feed.url).not.toBe(' ');
                });
            });

            it('has name defined and the name field is not empty', function() {
                allFeeds.forEach(function(feed) {
                    expect(feed.name).toBeDefined();
                    expect(feed.name).not.toBe(null);
                    expect(feed.name).not.toBe(' ');
                });
            });
        });


        describe('The menu', function() {
            /* This test ensures the menu element is
             * hidden by default.
             */
            it('menu to be hidden by default', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });

            /* This test ensures the menu changes
             * visibility when the menu icon is clicked then closes when clicked
             * again.
             */
            it('menu displays when clicked then hides when clicked again', function() {
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBeFalsy();
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
            });
        });

        describe('Initial Entries', function() {

            /* This test ensures when the loadFeed function is called and
             * completes its work, there is at least
             * a single .entry element within the .feed container.
             */
            beforeEach(function(done) {
                loadFeed(0, done);
            });

            it('should call and complete loadFeed with at least one item in the list', function() {
                var item = document.getElementsByClassName('entry');
                expect(item.length).toBeGreaterThan(0);
            });
        });

        describe('New Feed Selection', function() {
            /* This test checks that when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             */

            var oldTitles;

            beforeEach(function(done) {
                loadFeed(0, function() {
                    oldTitles = $('.feed a article h2').map(function() {
                        return $(this).text();
                    }).get();
                    done();
                });
            });

            it('old feed h2 title tags should not match new feed titles exactly', function(done) {

                loadFeed(1, function() {
                    var newTitles = $('.feed a article h2').map(function() {
                        return $(this).text();
                    }).get();
                    expect(oldTitles).not.toEqual(newTitles);
                    done();
                });
            });
        });
    });
}());
