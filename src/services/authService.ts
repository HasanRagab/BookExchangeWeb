const users = [
  {
    id: "1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@bookswap.com",
    password: "admin123",
    role: "admin",
    approved: true,
  },
  {
    id: "2",
    firstName: "Book",
    lastName: "Owner",
    email: "owner@bookswap.com",
    password: "owner123",
    role: "bookOwner",
    approved: true,
  },
  {
    id: "3",
    firstName: "Reader",
    lastName: "User",
    email: "reader@bookswap.com",
    password: "reader123",
    role: "reader",
    approved: true,
  },
];

// Mock local storage key
const AUTH_TOKEN_KEY = "bookswap_auth_token";
const USER_KEY = "bookswap_user";

export const fakeAuthService = {
  // Login user
  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (user.role === "bookOwner" && !user.approved) {
      throw new Error("Your account is pending approval by an admin");
    }

    // Create a user object without the password
    const authenticatedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    // Store in localStorage (in a real app, you'd store a JWT token)
    localStorage.setItem(AUTH_TOKEN_KEY, "fake-jwt-token-" + user.id);
    localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));

    return authenticatedUser;
  },

  // Register new user
  signup: async (userData: { firstName: string; lastName: string; email: string; password: string; role: "reader" | "bookOwner"; }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if email already exists
    if (users.some((u) => u.email === userData.email)) {
      throw new Error("Email already in use");
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      approved: userData.role === "reader",
    };

    // Add to our "database"
    users.push(newUser);

    // If user is a reader, log them in automatically
    if (userData.role === "reader") {
      const authenticatedUser = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      };

      localStorage.setItem(AUTH_TOKEN_KEY, "fake-jwt-token-" + newUser.id);
      localStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));

      return authenticatedUser;
    }

    // For book owners, return the user but don't log them in (pending approval)
    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      approved: newUser.approved,
    };
  },

  // Logout user
  logout: async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Remove from localStorage
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    return true;
  },

  // Get current user
  getCurrentUser: async () => {
    // Check if we have a token
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);

    if (!token || !userJson) {
      return null;
    }

    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  },
};
