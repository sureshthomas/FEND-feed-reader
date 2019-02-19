/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */


    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            //throw error;
        });


        /*
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined ', function () {
            allFeeds.forEach(function (urlfeed) {
                expect(urlfeed.url).toBeDefined();
                expect(urlfeed.url.length).toBeGreaterThan(0);
            });
        });


        /*
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('is that all feeds should have a non empty name', function () {
            allFeeds.forEach((urlfeed) => {
                expect(urlfeed.name).toBeDefined();
                expect(urlfeed.name.length).toBeGreaterThan(0);

            });

        });

    });

    /* : Write a new test suite named "The menu" */
    describe('The menu', function () {

        let menuState;
        // This is cached to avoid recreating them at the function level
        let menuIconLink = $('.menu-icon-link');
        let body = $('body');

        //Get the menu status and presever it in a local variable
        beforeEach(function () {
            menuState = body.hasClass('menu-hidden');

        });


        //Restore the menu state
        afterEach(function () {

            if (menuState !== body.hasClass('menu-hidden')) {
                body.addClass('menu-hidden');
            }
        });


        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is that the menu element is hidden by default', function () {

            //Check whether the correct class is assigned and hidden initially.
            expect(body.hasClass('menu-hidden')).toBeTruthy();


        });

        /* Write a test that ensures the menu element is
         * can be toggled and it works
         */

        it('is that menu sould be toggle-able', function () {
            //Once toggled - it should not be hidden (should be shown)
            expect(body.toggleClass('menu-hidden').hasClass('menu-hidden')).toBeFalsy();
            //Once again toggled , it should be hidden
            expect(body.toggleClass('menu-hidden').hasClass('menu-hidden')).toBeTruthy();

        });

        /*
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is menu visible when clicked and get hidden when clicked again', function () {


            menuIconLink.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menuIconLink.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();

        });

    });

    /** Write a new test suite named "Initial Entries" **/

    describe('Initial Entries', function () {


        /*
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //let noOfFeeds;

        beforeEach(function (done) {
            loadFeed(0, done);

        });

        it('is to ensure that all feeds are loaded', function () {

            let noOfFeeds = $('.feed .entry-link').length;
            expect(noOfFeeds).toBeGreaterThan(0);
        })
    });

    /* : Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        /* : Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */

        //existing udacity geed
        let existingFeed;
        //Feed no 1 from allFeeds
        let feed1;

        beforeEach(function (done) {
            $('.feed').empty();

            loadFeed(0, function () {

                existingFeed = $('.feed').html();
                loadFeed(1, done);
            });

        });
        it(' is to ensure that when a new feed is loaded', function () {
            feed1 = $('.feed').html();
            //Cehcking both are not same
            expect(existingFeed).not.toBe(feed1);
        });

    });

}());
