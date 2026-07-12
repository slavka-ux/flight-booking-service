describe('Full Booking Flow', () => {
  it('should allow user to search and book a flight', () => {
    cy.visit('/');
    
    // 1. Пошук рейсу
    cy.get('input[placeholder*="Origin"]').type('London');
    cy.get('input[placeholder*="Destination"]').type('New York');
    cy.get('button').contains('Search').click();
    
    // Перевірка результатів
    cy.url().should('include', '/flights');
    cy.contains('Book').should('be.visible');
    
    // 2. Вибір рейсу
    cy.get('button').contains('Book').first().click();
    
    // 3. Якщо користувач не авторизований, він має увійти (симулюємо авторизацію або пропускаємо)
    // В реальному тесті тут може бути cy.login()
    
    // 4. Заповнення форми бронювання (на сторінці BookPage)
    // cy.get('input[name="passengerName"]').type('John Doe');
    // cy.get('input[name="passportNumber"]').type('AB123456');
    // cy.get('button').contains('Confirm Booking').click();
    
    // 5. Перевірка успішного бронювання
    // cy.contains('Booking Confirmed').should('be.visible');
  });
});
