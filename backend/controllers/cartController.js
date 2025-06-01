import userModel from "../models/userModel.js"
import productModel from "../models/productModel.js";

//add products to user cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body; //From  Frontend
        const userId = req.user._id; //From Middleware 

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Default empty object if there cartData isn't

        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//update user cart
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.user._id;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) cartData[itemId] = {};
        if (quantity <= 0) {
            // Remove specific size
            delete cartData[itemId][size];

            // If all item_size deleted, then remove item
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            // Update if quantity>0
            cartData[itemId][size] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.error("Update Cart Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



//add products to user cart
const getUserCart = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find user by ID
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const cartData = userData.cartData || {};
        if (typeof cartData !== 'object') {
            throw new Error('Invalid cart data format');
        }

        // Fetch all valid product IDs
        const allProducts = await productModel.find({}, '_id'); // Assuming `productModel` is your product schema
        const productIds = new Set(allProducts.map(product => product._id.toString()));

        // Validate and filter cart data
        const validCartData = {};
        for (const itemId in cartData) {
            if (productIds.has(itemId.toString())) {
                const validSizes = Object.keys(cartData[itemId]).reduce((sizes, size) => {
                    if (cartData[itemId][size] > 0) {
                        sizes[size] = cartData[itemId][size];
                    }
                    return sizes;
                }, {});

                if (Object.keys(validSizes).length > 0) {
                    validCartData[itemId] = validSizes;
                }
            }
        }

        // Update the user's cart if invalid items were found
        if (JSON.stringify(cartData) !== JSON.stringify(validCartData)) {
            userData.cartData = validCartData;
            await userData.save();
        }

        res.status(200).json({ success: true, cartData: validCartData });
    } catch (error) {
        console.error("Get User Cart Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {addToCart,updateCart,getUserCart}