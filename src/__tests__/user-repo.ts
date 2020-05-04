import { UserRepository } from '../repos/user-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { User } from '../models/user';

jest.mock('..', () => {
    return {
        connectionPool: {
            connect: jest.fn()
        }
    }
});

jest.mock('../util/result-set-mapper', () => {
    return {
        mapUserResultSet: jest.fn()
    }
});

describe('userRepo', () => {

    let sut = new UserRepository();
    let mockConnect = mockIndex.connectionPool.connect;

    beforeEach(() => {

        (mockConnect as jest.Mock).mockClear().mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return {
                        rows: [
                            {
                                id: 1,
                                username: 'jvalencia',
                                password: 'poeadmin',
                                account_name: 'admin'
                            }
                        ]
                    }
                }), 
                release: jest.fn()
            }
        });
        
        (mockMapper.mapUserResultSet as jest.Mock).mockClear();
    });

    test('should resolve to an array of Users when getAll retrieves records from data source', async () => {
        
        // Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'un', 'pw', 'an');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(mockConnect).toBeCalledTimes(1);

    });

    test('should resolve to an empty array when getAll retrieves a records from data source', async () => {
        
        // Arrange
        expect.hasAssertions();
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(0);
        expect(mockConnect).toBeCalledTimes(1);

    });

    test('should resolve to a User object when getById retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'un', 'pw', 'an');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        let result = await sut.getById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

    test('should resolve to an empty array when getById retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();
        
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

    test('should resolve to a User object when getUserByUniqueKey retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'un', 'pw', 'an');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        let result = await sut.getUserByUniqueKey('username', 'jvalencia');

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

    test('should resolve to an empty array when getUserByUniqueKey retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();
        
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getUserByUniqueKey('username', 'jvalencia');

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

    test('should resolve to a User object when getUserByCredentials retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'un', 'pw', 'an');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        let result = await sut.getUserByCredentials('username', 'jvalencia');

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

    test('should resolve to an empty array when getUserByCredentials retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();
        
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getUserByCredentials('username', 'jvalencia');

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

    test('should resolve to a User object when save persists a record to the data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'un', 'pw', 'an');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        let result = await sut.save(mockUser);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

    test('should resolve to an empty array when save persists a record to the data source', async () => {

        // Arrange
        expect.hasAssertions();
        let mockUser = new User(1, 'un', 'pw', 'an');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.save(mockUser);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

    test('should resolve to true when update updates a record on the data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'un', 'pw', 'an');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(true);

        // Act
        let result = await sut.update(mockUser);

        // Assert
        expect(result).toBeTruthy();
        expect(result).toBe(true);

    });

    test('should resolve to true when deleteById deletes a record on the data source', async () => {

        // Arrange
        expect.hasAssertions();

        
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(true);

        // Act
        let result = await sut.deleteById(2);

        // Assert
        expect(result).toBeTruthy();
        expect(result).toBe(true);

    });


});