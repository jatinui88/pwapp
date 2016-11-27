var Products = (function() {
    function ProductViewModel() {
        var self = this;
        self.url = "";
        self.title = "";
        self.detail = "";
        self.price = "";
    }

    function ProductApiService() {
        var self = this;

        // retrieves all products from the API
        self.getAll = function() {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', './api/data.json');

                request.onload = function() {
                    // success
                    if (request.status === 200) {
                        // resolve the promise with the parsed response text (assumes JSON)
                        resolve(JSON.parse(request.response));
                    } else {
                        // error retrieving file
                        reject(Error(request.statusText));
                    }
                };

                request.onerror = function() {
                    // network errors
                    reject(Error("Network Error"));
                };

                request.send();
            });
        };
    }

    function ProductAdapter() {
        var self = this;

        self.toProductViewModel = function(data) {
            if (data) {
                var vm = new ProductViewModel();
                vm.url = data.url;
                vm.title = data.title;
                vm.detail = data.detail;
                vm.price = data.price;
                return vm;
            }
            return null;
        };

        self.toProductViewModels = function(data) {
            if (data && data.length > 0) {
                return data.map(function(item) {
                    return self.toProductViewModel(item);
                });
            }
            return [];
        };
    }

    function ProductController(ProductApiService, productAdapter) {
        var self = this;

        self.getAll = function() {
            // retrieve all the products from the API
            return productApiService.getAll().then(function(response) {
                return productAdapter.toProductViewModels(response);
            });
        };
    }


    // initialize the services and adapters
    var productApiService = new ProductApiService();
    var productAdapter = new ProductAdapter();

    // initialize the controller
    var productController = new ProductController(productApiService, productAdapter);

    return {
        loadData: function() {
            // retrieve all routes
            document.querySelector(".main-content").classList.add('loading')
            productController.getAll().then(function(response) {
                // bind the products to the UI
                Page.vm.products(response);
                document.querySelector(".main-content").classList.remove('loading')
            });
        }
    }

})();
