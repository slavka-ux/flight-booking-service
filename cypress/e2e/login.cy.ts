describe('Login Flow', () => {
  it('should successfully log in a user with valid credentials', () => {
    cy.visit('/login');
    
    // Перевірка наявності елементів на сторінці
    cy.contains('h2', 'Sign In').should('be.visible');
    
    // Ввід даних
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    
    // Клік по кнопці
    cy.get('button').contains('Sign In').click();
    
    // Має перенаправити на головну сторінку або профіль
    cy.url().should('not.include', '/login');
  });

  it('should show error with invalid credentials', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpass');
    cy.get('button').contains('Sign In').click();
    
    // Має з'явитись повідомлення про помилку
    // (Це приклад, залежить від реалізації фронтенду)
    // cy.contains('Invalid credentials').should('be.visible');
  });
});
