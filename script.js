document.addEventListener('DOMContentLoaded',()=>{
  // Carrito de compras
  const cart = [];
  const cartCount = document.getElementById('cartCount');

  // Elementos del modal
  const cartModal = document.getElementById('cartModal');
  const cartList = document.getElementById('cartList');
  const cartBtn = document.getElementById('cartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartTotal = document.getElementById('cartTotal');

  // Actualiza el contador del carrito
  function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = total;
  }

  // Renderiza los productos en el modal con opción de eliminar y muestra el total
  function renderCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;
    if (cart.length === 0) {
      cartList.innerHTML = '<li>El carrito está vacío.</li>';
      cartTotal.textContent = '';
      return;
    }
    cart.forEach((item, idx) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.width = '100%';
      li.style.padding = '8px 0';
      li.style.gap = '0';
      // Info container (name and price)
      const infoWrap = document.createElement('div');
      infoWrap.style.display = 'flex';
      infoWrap.style.alignItems = 'center';
      infoWrap.style.justifyContent = 'space-between';
      infoWrap.style.flex = '1';
      infoWrap.style.gap = '18px';
      // Product name/details
  const info = document.createElement('span');
  info.textContent = `${item.title} x${item.qty}`;
  info.style.textAlign = 'left';
  info.style.fontSize = '1.08rem';
  info.style.fontWeight = '500';
  info.style.whiteSpace = 'nowrap';
  info.style.overflow = 'hidden';
  info.style.textOverflow = 'ellipsis';
  info.style.wordBreak = 'normal';
      // Price
      const price = document.createElement('span');
      price.textContent = `$${item.price * item.qty}`;
      price.style.fontWeight = '600';
      price.style.fontSize = '1.08rem';
      price.style.color = '#222';
      infoWrap.appendChild(info);
      infoWrap.appendChild(price);
      totalPrice += item.price * item.qty;
      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Eliminar';
      removeBtn.className = 'btn ghost';
      removeBtn.style.fontSize = '0.9rem';
      removeBtn.style.marginLeft = '18px';
      removeBtn.onclick = () => {
        cart.splice(idx, 1);
        updateCartCount();
        renderCart();
      };
      li.appendChild(infoWrap);
      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });
    cartTotal.textContent = `Total: $${totalPrice}`;
  }

  // Agrega producto al carrito
  function addToCart(product) {
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCartCount();
    renderCart();
    alert(product.title + " agregado al carrito!");
  }

  // Evento para botones de compra
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('[data-action="add"]');
    if (!btn) return;
    const product = JSON.parse(btn.dataset.product);
    addToCart(product);
  });

  // Mostrar el modal del carrito
  cartBtn.addEventListener('click', () => {
    renderCart();
    cartModal.setAttribute('aria-hidden', 'false');
  });

  // Cerrar el modal del carrito
  closeCart.addEventListener('click', () => {
    cartModal.setAttribute('aria-hidden', 'true');
  });

  // Finalizar compra
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
      }
      alert('¡Gracias por tu compra!');
      cart.length = 0;
      updateCartCount();
      renderCart();
      cartModal.setAttribute('aria-hidden', 'true');
    });
  }

  // Actualiza el año en el footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});