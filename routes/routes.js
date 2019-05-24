const Product = require('../app/models/product')

const appRouter = (router) => {
    router.get("/", async (req, res) => {
        res.json({ message: "Welcome to base RestFull API!" });   
    });
	router.post("/product", async (req, res) => {
	    if(!req.body) {
	        return res.status(400).send({
	            message: "Product content can not be empty"
	        });
	    }

	    const product = new Product({
	        name: req.body.name,
			picture: req.body.picture,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description
	    });

	    // Save Product in the database
	    product.save()
		    .then(data => {
		        res.send(data);
		    }).catch(err => {
		        res.status(500).send({
		            message: err.message || "Something wrong while creating the product."
		        });
		    });
	});

	router.get("/products", async (eq, res) => {
		Product.find()
		    .then(products => {
		        res.send(products);
		    }).catch(err => {
		        res.status(500).send({
		            message: err.message || "Something wrong while retrieving products."
		        });
		    });
	});

	router.get("/product/:id", async (req, res) => {
		Product.findById(req.params.id)
		    .then(product => {
		        if(!product) {
		            return res.status(404).send({
		                message: "Product not found with id " + req.params.id
		            });            
		        }
		        res.send(product);
		    }).catch(err => {
		        if(err.kind === 'ObjectId') {
		            return res.status(404).send({
		                message: "Product not found with id " + req.params.id
		            });                
		        }
		        return res.status(500).send({
		            message: "Something wrong retrieving product with id " + req.params.id
		        });
		    });
	});

	router.put("/product/:id", async (req, res) => {
		// Validate Request
	    if(!req.body) {
	        return res.status(400).send({
	            message: "Product content can not be empty"
	        });
	    }

	    Product.findByIdAndUpdate(req.params.id, {
	        name: req.body.name,
			picture: req.body.picture,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description
	    }, {new: true})
	    .then(product => {
	        if(!product) {
	            return res.status(404).send({
	                message: "Product not found with id " + req.params.id
	            });
	        }
	        res.send(product);
	    }).catch(err => {
	        if(err.kind === 'ObjectId') {
	            return res.status(404).send({
	                message: "Product not found with id " + req.params.id
	            });                
	        }
	        return res.status(500).send({
	            message: "Something wrong updating note with id " + req.params.id
	        });
	    });
	});

	router.delete("/product/:id", async (req, res) => {
		Product.findByIdAndRemove(req.params.id)
		    .then(product => {
		        if(!product) {
		            return res.status(404).send({
		                message: "Product not found with id " + req.params.id
		            });
		        }
		        res.send({message: "Product deleted successfully!"});
		    }).catch(err => {
		        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
		            return res.status(404).send({
		                message: "Product not found with id " + req.params.id
		            });                
		        }
		        return res.status(500).send({
		            message: "Could not delete product with id " + req.params.id
		        });
		    });
	});
}

module.exports = appRouter;