// User service unit tests

const { registerUser, changePasswordByUsername, authenticate } = require('../../../services/user.service');

describe('User service - validation tests', () => {

  describe('registerUser validation', () => {
    it('should throw error for too short username', async () => {
      await expect(registerUser('ab', 'ValidPass123')).rejects.toThrow('Incorrect username format');
    });

    it('should throw error for too long username', async () => {
      await expect(registerUser('averyverylongusername', 'ValidPass123')).rejects.toThrow('Incorrect username format');
    });

    it('should throw error for username with spaces', async () => {
      await expect(registerUser('user name', 'ValidPass123')).rejects.toThrow('Incorrect username format');
    });

    it('should throw error for invalid password (too short)', async () => {
      await expect(registerUser('validuser', 'Short1')).rejects.toThrow('Incorrect password format');
    });

    it('should throw error for password without uppercase', async () => {
      await expect(registerUser('validuser', 'lowercase1')).rejects.toThrow('Incorrect password format');
    });

    it('should throw error for password without digits', async () => {
      await expect(registerUser('validuser', 'NoDigitsPass')).rejects.toThrow('Incorrect password format');
    });
  });

  describe('changePasswordByUsername validation', () => {
    it('should throw error for invalid password format', async () => {
      await expect(changePasswordByUsername('user', 'short')).rejects.toThrow('Incorrect password format');
    });
  });

  describe('authenticate validation', () => {
    it('should throw error if username is empty', async () => {
      await expect(authenticate('', 'SomePass123')).rejects.toThrow();
    });

    it('should throw error if password is empty', async () => {
      await expect(authenticate('user', '')).rejects.toThrow();
    });

    it('should throw error if both username and password are empty', async () => {
      await expect(authenticate('', '')).rejects.toThrow();
    });
  });

});
