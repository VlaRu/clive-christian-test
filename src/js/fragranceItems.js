// Function to fetch products data
async function fetchProducts() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

function createFragranceItem(product) {
    const item = document.createElement('div');
    item.className = 'fragrance-card';

    const img = document.createElement('img');
    img.src = `./assets/images/products/${product.image}`;
    img.alt = product.name;
    img.className = 'fragrance-img';

    const button = document.createElement('button');
    button.className = 'fragrance-explore-btn';
    button.textContent = 'Explore more';

    const plusSpan = document.createElement('span');
    plusSpan.className = 'explore-plus';
    button.appendChild(plusSpan);

    const title = document.createElement('div');
    title.className = 'fragrance-name';
    title.textContent = product.name;

    item.appendChild(img);
    item.appendChild(button);
    item.appendChild(title);

    return item;
}

async function renderFragranceItems() {
    const container = document.querySelector('.fragrance-gallery');
    if (!container) return;

    const products = await fetchProducts();

    products.forEach(product => {
        const item = createFragranceItem(product);
        container.appendChild(item);
    });
}

export { renderFragranceItems };