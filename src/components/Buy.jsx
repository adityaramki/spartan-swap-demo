import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, getDocs } from 'firebase/firestore';

const Buy = () => {
    const [cart, setCart] = useState([]);
    const [listings, setListings] = useState([]); 
    const [newItem, setNewItem] = useState(""); 

    useEffect(() => {
        // Fetch listings from Firestore
        const unsubscribe = onSnapshot(collection(db, "listings"), (snapshot) => {
            setListings(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        });

        return () => unsubscribe();
    }, []);

    const addListing = async () => {
        if (!newItem.trim()) return;

        const user = auth.currentUser; 
        if (!user) {
            alert("You must be logged in to add a listing.");
            return;
        }

        try {
            await addDoc(collection(db, "listings"), {
                item: newItem,
                email: user.email, 
            });
            setNewItem(""); 
        } catch (error) {
            console.error("Error adding listing:", error);
        }
    };

    const toggleCart = (option) => {
        if (!cart.includes(option)) {
            setCart([...cart, option]); 
        } else {
            setCart(cart.filter(item => item !== option)); 
        }
    };

    const buyItems = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to buy items.");
            return;
        }

        try {
            const q = query(collection(db, "listings"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (listing) => {
                if (cart.includes(listing.data().item)) {
                    await deleteDoc(doc(db, "listings", listing.id)); // Delete each item in cart
                }
            });

            setCart([]); // Clear cart after purchase
        } catch (error) {
            console.error("Error buying items:", error);
        }
    };

    return (
        <div className='bg-gray-300 max-w-[1920px] h-screen mx-auto py-16 px-4 text-black'>
            <div className="flex flex-col justify-between items-center h-24 max-w-[1920px] mx-auto px-4 text-white">
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold md: py-6 self-start'>
                    Click an item to add to cart, click again to remove it. Hover over an item to see who listed it.
                </h1>

                {/* Cart */}
                <h2 className="md:flex p-4 bg-gray-500 rounded text-white mb-4 self-start">
                    Cart: {cart.length > 0 ? cart.join(", ") : "None"}
                </h2>

                {/* Add Listing Input */}
                <div className="flex gap-2 mb-4 self-start">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Enter new item"
                        className="p-2 border rounded text-black"
                    />
                    <button onClick={addListing} className="p-2 bg-green-500 text-white rounded">
                        Add Listing
                    </button>
                </div>

                {/* Listings */}
                <div className="flex flex-wrap gap-4 self-start">
                    {listings.map((listing, index) => (
                        <div key={listing.id} className="relative group">
                            <button
                                onClick={() => toggleCart(listing.item)}
                                className="p-4 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                            >
                                {listing.item}
                            </button>
                            <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition">
                                {listing.email}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Buy Button */}
                <button 
                    onClick={buyItems} 
                    className="p-4 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition self-start"
                >
                    Buy Items
                </button>
            </div>
        </div>
    );
};

export default Buy;
