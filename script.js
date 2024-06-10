document.addEventListener('DOMContentLoaded', function() {
    function addItem(listId, itemText, type = null) {
        let listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.dataset.type = type; 
        listItem.innerHTML = `${itemText} <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>`;
        document.querySelector(listId).appendChild(listItem);
        
        listItem.querySelector('.delete-btn').addEventListener('click', function(e) {
            e.stopPropagation(); 
            listItem.remove();
        });

        if (listId === '#generalList') {
            listItem.addEventListener('click', function(e) {
                if (e.target.tagName !== 'BUTTON') { 
                    if (listItem.dataset.type === 'fruit') {
                        addItem('#fruitList', `Fruits! - ${itemText}`, 'fruit');
                    } else if (listItem.dataset.type === 'legume') {
                        addItem('#legumeList', `Legumes! - ${itemText}`, 'legume');
                    }
                    listItem.remove();
                }
            });
        }
    }

    function addGeneralItem(itemText, itemType) {
        addItem('#generalList', itemText, itemType);
    }

    function addSpecificItem() {
        let itemText = document.getElementById('itemInput').value;
        if (!itemText) {
            alert('Please enter an item');
            return;
        }

        let itemType = document.querySelector('input[name="itemType"]:checked');
        if (!itemType) {
            alert('Please select whether it is a fruit or legume');
            return;
        }

        if (itemType.value === 'fruit') {
            addItem('#fruitList', `Fruits! - ${itemText}`, 'fruit');
        } else {
            addItem('#legumeList', `Legumes! - ${itemText}`, 'legume');
        }

        document.getElementById('itemInput').value = '';
    }

    function searchItems() {
        let searchText = document.getElementById('searchInput').value.toLowerCase();
        let allItems = document.querySelectorAll('.list-group-item');
        
        allItems.forEach(function(item) {
            if (item.textContent.toLowerCase().includes(searchText)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function deleteItems() {
        let searchText = document.getElementById('searchInput').value.toLowerCase();
        let allItems = document.querySelectorAll('.list-group-item');
        
        allItems.forEach(function(item) {
            if (item.textContent.toLowerCase().includes(searchText)) {
                item.remove();
            }
        });
    }

    document.getElementById('addSpecificBtn').addEventListener('click', function() {
        addSpecificItem();
    });

    document.getElementById('addGeneralBtn').addEventListener('click', function() {
        let itemText = document.getElementById('itemInput').value;
        if (!itemText) {
            alert('Please enter an item');
            return;
        }

        let itemType = document.querySelector('input[name="itemType"]:checked');
        if (!itemType) {
            alert('Please select whether it is a fruit or legume');
            return;
        }

        addGeneralItem(itemText, itemType.value);
        document.getElementById('itemInput').value = '';
    });

    document.getElementById('searchBtn').addEventListener('click', function() {
        searchItems();
    });

    document.getElementById('deleteBtn').addEventListener('click', function() {
        deleteItems();
    });

    document.getElementById('searchInput').addEventListener('input', function() {
        searchItems();
    });
});