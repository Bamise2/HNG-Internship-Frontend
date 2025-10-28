// Authentication utility for ticket app
const SESSION_KEY = 'ticketapp_session';

// Mock user database
const MOCK_USERS = [
  { id: 1, email: 'demo@ticket.app', password: 'password123', name: 'Demo User' },
  { id: 2, email: 'admin@ticket.app', password: 'admin123', name: 'Admin User' }
];

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (user) {
        const session = {
          token: `token_${Date.now()}_${user.id}`,
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          },
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        };
        
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        resolve(session);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
};

export const signup = (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = MOCK_USERS.find(u => u.email === email);
      
      if (existingUser) {
        reject(new Error('User with this email already exists'));
      } else {
        const newUser = {
          id: MOCK_USERS.length + 1,
          email,
          password,
          name
        };
        
        MOCK_USERS.push(newUser);
        
        const session = {
          token: `token_${Date.now()}_${newUser.id}`,
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name
          },
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        };
        
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        resolve(session);
      }
    }, 800);
  });
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getSession = () => {
  const sessionStr = localStorage.getItem(SESSION_KEY);
  
  if (!sessionStr) return null;
  
  try {
    const session = JSON.parse(sessionStr);
    
    if (session.expiresAt < Date.now()) {
      logout();
      return null;
    }
    
    return session;
  } catch (error) {
    logout();
    return null;
  }
};

export const isAuthenticated = () => {
  return getSession() !== null;
};

export const getCurrentUser = () => {
  const session = getSession();
  return session ? session.user : null;
};