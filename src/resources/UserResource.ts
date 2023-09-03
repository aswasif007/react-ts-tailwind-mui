import BaseResource from './BaseResource';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

class UserResource extends BaseResource<UserData> {
  static async login(email: string, password: string): Promise<UserResource> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData = await Promise.resolve({
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
    });

    const user = new UserResource(userData);
    user.updateStore();

    return user;
  }
}

export default UserResource;
