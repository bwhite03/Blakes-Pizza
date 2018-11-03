class Order {
   constructor(size, pizza, bread, chicken, pasta, dessert, drink){
      this.size = size;
      this.pizza = pizza;
      this.bread = bread;
      this.chicken = chicken;
      this.pasta = pasta;
      this.dessert = dessert;
      this.drink = drink;
   }
}

class UI {
   addOrderToList(order) {
      const list = document.querySelector('#order-list');
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${order.size}</td>
      <td>${order.pizza}</td>
      <td>${order.bread}</td>
      <td>${order.chicken}</td>
      <td>${order.pasta}</td>
      <td>${order.dessert}</td>
      <td>${order.drink}</td>
      <td><a href="#" class="delete"><i class="fas fa-times"></i></a></td>
      `;
      list.appendChild(row);
   }

   showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert ${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.order-container');
      const placeorder = document.querySelector('.order-now');
      container.insertBefore(div, placeorder);
      setTimeout(function(){
         document.querySelector('.alert').remove();
      }, 3000);
   }

   deleteOrder(target) {
      if (target.className === 'fas fa-times') {
         target.parentElement.parentElement.parentElement.remove();
      }
   }
}

class Store {
    static getOrders() {
        let orders;
        if(localStorage.getItem('orders') === null) {
          orders = [];
        } else {
          orders = JSON.parse(localStorage.getItem('orders'));
        }
    
        return orders;
      }
    
    static displayOrders() {
        const orders = Store.getOrders();

        orders.forEach(function(order){
        const ui  = new UI;

        ui.addOrderToList(order);
        });
    } 
    
    static addOrder(order) {
        const orders = Store.getOrders();

        orders.push(order);

        localStorage.setItem('orders', JSON.stringify(orders));
    }

    static removeOrder(drink) {
        const orders = Store.getOrders();

        orders.forEach(function(order, index){
        if(order.drink === drink) {
        orders.splice(index, 1);
        }
        });

        localStorage.setItem('orders', JSON.stringify(orders));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayOrders);

document.querySelector('.order-now').addEventListener('click', function(e){
   const size = document.querySelector('#sizes').value;
         pizza = document.querySelector('#pizzaType').value;
         bread = document.querySelector('#bread').value;
         chicken = document.querySelector('#chicken').value;
         pasta = document.querySelector('#pasta').value;
         dessert = document.querySelector('#dessert').value;
         drink = document.querySelector('#drink').value;

   const order = new Order(size,pizza,bread,chicken,pasta,dessert,drink);      
   const ui = new UI();

   if (size === '' && pizza === '' && bread === '' && chicken === '' && pasta === '' && dessert === '' && drink === '') {
      ui.showAlert('Please fill in fields', 'error');
   } else {
      ui.addOrderToList(order);

      Store.addOrder(order);

      ui.showAlert('Order Placed', 'success');
   }

   document.querySelector('#sizes').value = '';
   document.querySelector('#pizzaType').value = '';
   document.querySelector('#bread').value = '';
   document.querySelector('#chicken').value = '';
   document.querySelector('#pasta').value = '';
   document.querySelector('#dessert').value = '';
   document.querySelector('#drink').value = '';
   });


   document.querySelector('#order-list').addEventListener('click', function(e){
      
      const ui = new UI();
      ui.deleteOrder(e.target);

      Store.removeOrder(e.target.parentElement.parentElement.previousElementSibling.textContent);
   });