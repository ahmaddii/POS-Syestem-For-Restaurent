        // Menu data with your asset image URLs
        const menuItems = [
            { 
                id: 1, 
                name: "Chicken Tikka Pizza", 
                price: 850, 
                category: "pizza",
                image: "images/01.png"  // Replace with your image path
            },
            { 
                id: 2, 
                name: "Beef Pepperoni Pizza", 
                price: 950, 
                category: "pizza",
                image: "images/02.png"  // Replace with your image path
            },
            { 
                id: 3, 
                name: "Cheese Lovers Pizza", 
                price: 750, 
                category: "pizza",
                image: "images/03.png"  // Replace with your image path
            },
            { 
                id: 4, 
                name: "Vegetable Supreme", 
                price: 650, 
                category: "pizza",
                image: "images/04.png"  // Replace with your image path
            },
            { 
                id: 5, 
                name: "BBQ Chicken Pizza", 
                price: 900, 
                category: "pizza",
                image: "images/05.png"  // Replace with your image path
            },
            { 
                id: 6, 
                name: "Behari Kabab", 
                price: 600, 
                category: "pizza",
                image: "images/06.png"  // Replace with your image path
            },

            { id: 7, 
              name: "Coca Cola", 
              price: 80, 
              category: "drink",
              image:"images/07.png"
            
            },

             { id: 8, 
              name: "7up", 
              price: 80, 
              category: "drink",
              image:"images/08.png"
            
            },

             { id: 9, 
              name: "Fanta", 
              price: 80, 
              category: "drink",
              image:"images/09.png"
            
            },

             { id: 10, 
              name: "Water", 
              price: 80, 
              category: "drink",
              image:"images/10.png"
            
            },

            { id: 11, 
              name: "Garlic Bread", 
              price: 650, 
              category: "drink",
              image:"images/11.png"
            
            },

            { id: 12, 
              name: "Chicken Wings", 
              price: 700, 
              category: "food",
              image:"images/12.png"
            
            },

            { id: 12, 
              name: "French Fries", 
              price: 390, 
              category: "food",
              image:"images/13.png"
            
            },


        ];

        let currentOrder = [];
        let orderNumber = 1;

        // Initialize the application
        function initApp() {
            renderMenu();
            updateOrderNumber();
        }

        // Render menu items
        function renderMenu() {
            const menuGrid = document.getElementById('menuGrid');
            menuGrid.innerHTML = '';

            menuItems.forEach(item => {
                const menuItemDiv = document.createElement('div');
                menuItemDiv.className = `menu-item ${item.category}`;
                menuItemDiv.onclick = () => addToOrder(item);
                
                // Create image element
                let imageContent;
                if (item.image) {
                    imageContent = `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                   <div style="display: none; width: 100%; height: 100%; background: #ecf0f1; align-items: center; justify-content: center; font-size: 3em; color: #bdc3c7;">🍕</div>`;
                } else {
                    // Default icons for different categories
                    const icons = {
                        pizza: '🍕',
                        drink: '🥤',
                        side: '🍟'
                    };
                    imageContent = `<div style="width: 100%; height: 100%; background: #ecf0f1; display: flex; align-items: center; justify-content: center; font-size: 3em; color: #bdc3c7;">${icons[item.category] || '🍽️'}</div>`;
                }
                
                menuItemDiv.innerHTML = `
                    <div class="item-image">
                        ${imageContent}
                    </div>
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <div class="price">Rs. ${item.price}</div>
                    </div>
                `;
                
                menuGrid.appendChild(menuItemDiv);
            });
        }

        // Add item to order
        function addToOrder(item) {
            const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                currentOrder.push({
                    ...item,
                    quantity: 1
                });
            }
            
            renderOrder();
            updateTotal();
        }

        // Remove item from order
        function removeFromOrder(itemId) {
            currentOrder = currentOrder.filter(item => item.id !== itemId);
            renderOrder();
            updateTotal();
        }

        // Update item quantity
        function updateQuantity(itemId, change) {
            const item = currentOrder.find(orderItem => orderItem.id === itemId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromOrder(itemId);
                } else {
                    renderOrder();
                    updateTotal();
                }
            }
        }

        // Render order items
        function renderOrder() {
            const orderItemsDiv = document.getElementById('orderItems');
            
            if (currentOrder.length === 0) {
                orderItemsDiv.innerHTML = '<div class="empty-order">Click on menu items to add to order</div>';
                return;
            }

            orderItemsDiv.innerHTML = '';
            
            currentOrder.forEach(item => {
                const orderItemDiv = document.createElement('div');
                orderItemDiv.className = 'order-item';
                
                orderItemDiv.innerHTML = `
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">Rs. ${item.price} each</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="qty-btn remove-btn" onclick="removeFromOrder(${item.id})">×</button>
                    </div>
                `;
                
                orderItemsDiv.appendChild(orderItemDiv);
            });
        }

        // Update total amount
        function updateTotal() {
            const total = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('totalAmount').textContent = total;
        }

        // Clear order
        function clearOrder() {
            if (currentOrder.length > 0 && confirm('Are you sure you want to clear the current order?')) {
                currentOrder = [];
                renderOrder();
                updateTotal();
            }
        }

        // Generate and show receipt
        function printOrder() {
            if (currentOrder.length === 0) {
                alert('Please add items to the order first!');
                return;
            }

            generateReceipt();
            document.getElementById('receiptModal').style.display = 'flex';
        }

        // Generate receipt content
        function generateReceipt() {
            const now = new Date();
            const dateTime = now.toLocaleDateString('en-PK') + ' ' + now.toLocaleTimeString('en-PK');
            const total = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            let receiptHTML = `
                <div class="receipt-header">
                    <h2>🍕 Slice and Spice Pizza</h2>
                    <div>Mianwali, Punjab</div>
                    <div>Phone: 0304-7403455</div>
                    <div style="margin-top: 10px;">
                        <strong>Order #${orderNumber.toString().padStart(3, '0')}</strong>
                    </div>
                    <div>${dateTime}</div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 5px;">
                        <span>ITEM</span>
                        <span>QTY</span>
                        <span>PRICE</span>
                    </div>
                </div>
            `;

            currentOrder.forEach(item => {
                const itemTotal = item.price * item.quantity;
                receiptHTML += `
                    <div class="receipt-line">
                        <span style="flex: 1;">${item.name}</span>
                        <span style="width: 30px; text-align: center;">${item.quantity}</span>
                        <span style="width: 80px; text-align: right;">Rs. ${itemTotal}</span>
                    </div>
                `;
            });

            receiptHTML += `
                <div class="receipt-total">
                    <div class="receipt-line" style="font-size: 1.2em;">
                        <span>TOTAL:</span>
                        <span>Rs. ${total}</span>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 2px dashed #bdc3c7;">
                    <div>Thank you for choosing</div>
                    <div><strong>Slice and Spice Pizza Time!</strong></div>
                    <div style="margin-top: 10px; font-size: 0.9em;">Visit us again soon!</div>
                </div>
            `;

            document.getElementById('receiptContent').innerHTML = receiptHTML;
        }

        // Close receipt modal
        function closeReceipt() {
            document.getElementById('receiptModal').style.display = 'none';
            
            // Clear order and increment order number after printing
            currentOrder = [];
            orderNumber++;
            renderOrder();
            updateTotal();
            updateOrderNumber();
        }

        // Update order number display
        function updateOrderNumber() {
            document.getElementById('orderNumber').textContent = orderNumber.toString().padStart(3, '0');
        }

        // Initialize the app when page loads
        window.onload = initApp;

        // Handle window resize
        window.addEventListener('resize', () => {
            renderOrder();
        });
    