// Food Picture API 串接
document.addEventListener('DOMContentLoaded', function () {
    const foodImageElement = document.getElementById('food-image');
    const mealNameElement = document.getElementById('meal-name');
    const fetchFoodBtn = document.getElementById('fetch-food-btn');

    function fetchAndDisplayFoodImage() {
        const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
        foodImageElement.src = 'https://via.placeholder.com/400x300?text=載入中...';
        mealNameElement.textContent = '載入中...';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.meals && data.meals.length > 0) {
                    const meal = data.meals[0];
                    foodImageElement.src = meal.strMealThumb;
                    foodImageElement.alt = meal.strMeal;
                    mealNameElement.textContent = meal.strMeal;
                } else {
                    console.error('API 回應格式錯誤或無資料:', data);
                    foodImageElement.src = 'https://via.placeholder.com/400x300?text=載入失敗';
                    foodImageElement.alt = '圖片載入失敗';
                    mealNameElement.textContent = '獲取餐點失敗。';
                }
            })
            .catch(error => {
                console.error('獲取食物圖片失敗:', error);
                foodImageElement.src = 'https://via.placeholder.com/400x300?text=載入失敗';
                foodImageElement.alt = '網路錯誤';
                mealNameElement.textContent = '網路錯誤，請稍後再試。';
            });
    }
    fetchAndDisplayFoodImage();
    fetchFoodBtn.addEventListener('click', fetchAndDisplayFoodImage);
});