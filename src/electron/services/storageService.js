let store;

(async () => {
    const ElectronStore = (await import('electron-store')).default;
    store = new ElectronStore();
})();

const storageService = {
    saveCredentials: async (credentials) => {
        await waitForStore();
        store.set('azureDevOpsUrl', credentials.azureUrl);
        store.set('personalAccessToken', credentials.azurePat);
    },

    saveTeamProjects: async (teamprojects) => {
        await waitForStore();
        store.set('teamProjects', JSON.parse(teamprojects));
    },

    removeCredentials: async () => {
        await waitForStore();
        store.delete('azureDevOpsUrl');
        store.delete('personalAccessToken');
    },

    getStorageData: async () => {
        await waitForStore();
        return {
            azureUrl: store.get('azureDevOpsUrl'),
            azurePat: store.get('personalAccessToken'),
            teamProjects: store.get('teamProjects')
        };
    }

};

async function waitForStore() {
    while (!store) {
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
}

module.exports = storageService;
