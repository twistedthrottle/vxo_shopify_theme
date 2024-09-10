window.recentlyViewedSectionLoaded = (product) => {
  product.querySelector('.product_listing_options')?.classList.add('hidden');
  
  product.querySelectorAll('.swatch').forEach(swatchDiv => {
    swatchDiv.querySelectorAll('input').forEach(inputElement => {
      inputElement.addEventListener('change', onVariantChange);
    });    
  });

  window.firstOptionValue = product.querySelectorAll('.swatch')[0]?.querySelector('input:checked').value;
  window.secondOptionValue = product.querySelectorAll('.swatch')[1]?.querySelector('input:checked').value;
  window.thirdOptionValue = product.querySelectorAll('.swatch')[2]?.querySelector('input:checked').value;

  product.querySelector('.variants-recently-viewed-cart-atc-button').addEventListener('click', onAddClick);

  product.querySelector('.variants-recently-viewed-cart')?.classList.remove('hidden');
  product.querySelector('.variants-recently-viewed-cart-atc-button')?.classList.remove('hidden');
};

const onVariantChange = (event) => {
  const swatchDiv = event.target.parentElement.parentElement;
  if ( swatchDiv.dataset.optionIndex === '1' ) {
    firstOptionValue = event.target.value;
  } else if ( swatchDiv.dataset.optionIndex === '2' ) {
    secondOptionValue = event.target.value;
  } else if ( swatchDiv.dataset.optionIndex === '3' ) {
    thirdOptionValue = event.target.value;
  }

  swatchDiv.querySelector('#selected-option-1').textContent = event.target.value;

  let selectedVariantName = '';
  if ( firstOptionValue ) selectedVariantName = firstOptionValue;
  if ( secondOptionValue ) selectedVariantName += ' / ' + secondOptionValue;
  if ( thirdOptionValue ) selectedVariantName += ' / ' + thirdOptionValue;

  const container = swatchDiv.parentElement.parentElement;
  container.querySelector('.variants-selectbox').value = container.querySelector('.variants-selectbox [data-variant-title="'+selectedVariantName+'"]').value;

  const variantData = JSON.parse(container.querySelector('.variants-selectbox [data-variant-title="'+selectedVariantName+'"]').dataset.config);
  const price = variantData.price;
  const comparePrice = variantData.compare_at_price;
  const formattedPrice = Shopify.formatMoney(price, Shopify.money_format);
  const formattedComparePrice = Shopify.formatMoney(comparePrice, Shopify.money_format);

  if ( comparePrice && price !== comparePrice ) {
    container.parentElement.querySelector('.price--listing .price__sale .price-item--sale').textContent = formattedPrice;
    container.parentElement.querySelector('.price--listing .price__sale .price-item--regular').textContent = formattedComparePrice;
    container.parentElement.querySelector('.price--listing').classList.add('price--on-sale');
    container.parentElement.parentElement.parentElement.querySelector('.sale-item').classList.remove('hidden');
  } else {
    container.parentElement.querySelector('.price--listing .price__regular .price-item--regular').textContent = formattedPrice;
    container.parentElement.querySelector('.price--listing').classList.remove('price--on-sale');
    container.parentElement.parentElement.parentElement.querySelector('.sale-item').classList.add('hidden');
  }

  if ( !variantData.available ) {
    container.parentElement.querySelector('.variants-recently-viewed-cart-atc-button').setAttribute('disabled', 'disabled');
    container.parentElement.querySelector('.variants-recently-viewed-cart-atc-button').textContent = 'Sold Out';
  } else {
    container.parentElement.querySelector('.variants-recently-viewed-cart-atc-button').removeAttribute('disabled');
    container.parentElement.querySelector('.variants-recently-viewed-cart-atc-button').textContent = 'Add To Cart';
  }
};

const onAddClick = (event) => {
  const selectedVariantId = event.target.parentElement.querySelector('.variants-selectbox').value;
  const formData = {
   'items': [{
    'id': selectedVariantId,
    'quantity': 1
    }]
  };
  
  fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    window.location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};
document.addEventListener("DOMContentLoaded", (event) => {
   var count = document.querySelector('#ymm_garage_link .ymm_counter');
  var marginElem = document.querySelector('#flex-header ul#cart li.ymm_garage_container')
    if(count){
      if(count.innerHTML == 0){ 
        console.log(marginElem)
        count.style.display = 'none';
        marginElem.style="margin-right: 10px;"
      }else{
        count.style.display = 'inline-flex';
        marginElem.style="margin-right: 26px;"
      }
    }
    var x = document.querySelector('#flex-header a.cart-icon .js-cart-count')
    if(x){
      if(Number.parseInt(x.innerHTML) == 0){
          x.style.display="none";
      }
      if(Number.parseInt(x.innerHTML) > 0){
          x.style.display="block";
      }
    }
});

// Code to select the Item Id metafield value according to the variant change
document.addEventListener('DOMContentLoaded', function() {
    // Get the hidden variant ID input
    const variantInput = document.querySelector('.formVariantId');
    if (!variantInput) return;
    // Select the variant metafield display element
    const variantMetafieldDisplay = document.getElementById('variant-metafield');
    const variantMetafieldDisplaycheckout = document.getElementById('mlItemId');
    // Select the hidden variant metafields select element
      const hiddenVariantMetafields = document.getElementById('hidden-variant-metafields');
      const updateMetafieldDisplay = () => {
      const selectedVariantId = variantInput.value;
      const selectedOption = hiddenVariantMetafields.querySelector(`option[value="${selectedVariantId}"]`);
      if (selectedOption) {
       // console.log(selectedOption);
        const metafieldValue = selectedOption.getAttribute('data-metafield');
        //console.log("metafieldValue",metafieldValue);
        variantMetafieldDisplay.innerHTML = metafieldValue;
        const metafieldValuecheckout = selectedOption.getAttribute('checkoutitemid');
        variantMetafieldDisplaycheckout.setAttribute("value", metafieldValuecheckout);
      }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(updateMetafieldDisplay);
    // Start observing the target node for configured mutations
    observer.observe(variantInput, { attributes: true, attributeFilter: ['value'] });
    // Initial update on page load
    updateMetafieldDisplay();
});
// End code to select the Item Id metafield value according to the variant change