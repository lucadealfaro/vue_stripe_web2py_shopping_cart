// This is the js for the default/index.html view.

var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    // Enumerates an array.
    var enumerate = function(v) {
        var k=0;
        return v.map(function(e) {e._idx = k++;});
    };

    self.get_products = function () {
        // Gets new products in response to a query, or to an initial page load.
        $.getJSON(products_url, $.param({q: self.vue.product_search}), function(data) {
            self.vue.products = data.products;
            enumerate(self.vue.products);
        });
    };


    self.inc_desired_quantity = function(product_idx, qty) {
        // Inc and dec to desired quantity.
        var p = self.vue.products[product_idx];
        p.desired_quantity = Math.max(0, p.desired_quantity + qty);
        p.desired_quantity = Math.min(p.quantity, p.desired_quantity);
    };

    self.count_cart = function () {
        var cart_size = 0;
        for (var i = 0; i < self.vue.products.length; i++) {
            if (self.vue.products[i].cart_quantity > 0) {
                cart_size++;
            }
        }
        self.vue.cart_size = cart_size;
    };

    self.buy_product = function(product_idx) {
        var p = self.vue.products[product_idx];
        p.cart_quantity = p.desired_quantity;
        // Updates the amount of products in the cart.
        self.count_cart();
    };

    self.toggle_show_cart = function () {
        self.vue.show_cart = !self.vue.show_cart;
    };

    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            products: [],
            cart: [],
            product_search: '',
            cart_size: 0,
            show_cart: false
        },
        methods: {
            get_products: self.get_products,
            inc_desired_quantity: self.inc_desired_quantity,
            buy_product: self.buy_product,
            toggle_show_cart: self.toggle_show_cart
        }

    });

    self.get_products();
    $("#vue-div").show();


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
