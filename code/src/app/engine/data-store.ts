/**
 * Data Store main class
 */
export class DataStore {
    private static _instance: DataStore = new DataStore();

    applnContext: any = {};


    constructor() {
        if (DataStore._instance) {
            throw new Error('Error: Instantiation failed: Use DataStore.getInstance() instead of new.');
        }
        DataStore._instance = this;
    }

    /**
     * Returns DataStore instance
     */
    public static getInstance(): DataStore {
        return DataStore._instance;
    }

    clearAll() {
        this.applnContext = {};
    }


    /**
     * Creates new application context data
     * @param {type} carrierName - creates application context data for provided name.
     * @param {type} carrierValue - application context value
     */
    setData(contextName, contextValue) {
        this.applnContext[contextName] = contextValue;
    }

    /**
     * Returns data stored in 'contextName'
     */
    getData(contextName) {
        if (this.applnContext[contextName]) {
            return this.applnContext[contextName];
        }
    }

    /**
     * Clear data stored in 'contextName'
     */
    clearContextData(contextName) {
        if (this.applnContext[contextName]) {
            this.applnContext[contextName] = null;
        }
    }

    /**
     * Check whether data stored in 'contextName'
     */
    isContextDataExists(contextName) {
        if (this.applnContext[contextName]) {
            return true;
        }
        return false;
    }
}
