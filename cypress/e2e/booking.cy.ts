describe('Flight Booking Flow', () => {
  it('should load the homepage and search for flights', () => {
    // Відкриваємо головну сторінку
    cy.visit('/');

    // Перевіряємо, чи є заголовок
    cy.contains('Search Flights');

    // Симулюємо ввід міст (оскільки у нас мок-дані або прості інпути)
    cy.get('input[placeholder*="Origin"]').type('London');
    cy.get('input[placeholder*="Destination"]').type('New York');

    // Натискаємо кнопку пошуку
    cy.get('button').contains('Search').click();

    // Переконуємось, що ми перейшли на сторінку результатів і бачимо рейси
    cy.url().should('include', '/flights');
    // Знаходимо картку рейсу (за класом FlightCard, якщо є, або шукаємо кнопку "Book")
    cy.contains('Book').should('exist');
  });

  it('should redirect to login if booking without account', () => {
    cy.visit('/flights');
    
    // Клікаємо першу кнопку бронювання
    cy.get('button').contains('Book').first().click();

    // Оскільки ми не авторизовані, нас має перекинути на сторінку входу
    cy.url().should('include', '/login');
    cy.contains('Sign In');
  });
});
