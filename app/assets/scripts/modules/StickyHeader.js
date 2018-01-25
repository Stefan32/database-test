import $ from 'jquery'; /* Because you use jquery in the constructor function */
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints'; /* This is to make use of Waypoints */
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.siteHeader = $(".site-header"); /* This selects elements with site-header as a class */
    this.headerTriggerElement = $(".large-hero__title"); /* This selects the trigger element, when element reaches the top of the screen it will trigger the event */
    this.createHeaderWaypoint(); /* We want the waypoint to be created as soon as the page loads, so we need to call and run the method from the constructor */
    this.pageSections = $(".page-section"); /* this selects all elements with a class of page-section */
    this.headerLinks = $(".primary-nav a"); /* Look inside the primary nav element and grab all link elements */
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint() {
    var that = this; /* Because "this" in the handler function does not point to "this" in the StickyHeader */
    new Waypoint({ /* We have acces to the waypoint class, because we imported it at the top */
      element: this.headerTriggerElement[0],
      handler: function(direction) { /* Direction is there to enable different events on scrolling down or up  */
        if (direction == "down") {
          that.siteHeader.addClass("site-header--dark"); /* Targets the element and gives class */
        } else { /* Other direction would obviously be "up" */
          that.siteHeader.removeClass("site-header--dark"); /* Targets the element and gives class */
        }
      } /* What you want to happen when triggered, add a modifier class to the header element */
    });
  }

  createPageSectionWaypoints() { /* New method that will create waypoints for each element selected */
    var that = this;
    this.pageSections.each(function() {
      var currentPageSection = this;
      new Waypoint({ /* Create waypoint for each element when scrolling down */
        element: currentPageSection,
        handler: function(direction) {
          if (direction == "down") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset: "18%" /* makes the event trigger 18% sooner when scrolling down */
      });

      new Waypoint({ /* Create waypoint for each element when scrolling up */
        element: currentPageSection,
        handler: function(direction) {
          if (direction == "up") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset: "-40%" /* makes the event trigger 40% sooner when scrolling up */
      });
    });
  }
}

export default StickyHeader;
