import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const processedUrl = (args = {}) => {
    let params = '';
    if (args.page && args.search) {
        params = `?only_search=1&search=${args.search}&page=${args.page}`;
    } else if (args.page) {
        params = `?page=${args.page}`;
    } else if (args.search) {
        params = `?only_search=1&search=${args.search}`;
    }

    console.log(params, args)

    return `https://dev.orkestra.mx/api/v1/directory/customers${params}`;
}


export default new Vuex.Store({
    state: {
        clients: [],
        args: {
            search: '',
            page: ''
        },
        loading: false
    },
    mutations: {
        setClients(state, clients) {
            state.clients = clients;
        },
        setArgs(state, args) {
            state.args = args;
        },
        setLoading(state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async getClients({ commit }, args) {
            commit('setLoading', true);
            try {
                const config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI1MDc1MDU3YTBiODY0NDY2YjQ3NjYxNjQ4OTA4ODIwYTYxNjcwZmU3MDIzOGU3ZjY4NDIyNWM2YzgwZjdkNWVjNzcxYTVlZGEwYjlmNzgzIn0.eyJhdWQiOiI1IiwianRpIjoiYjUwNzUwNTdhMGI4NjQ0NjZiNDc2NjE2NDg5MDg4MjBhNjE2NzBmZTcwMjM4ZTdmNjg0MjI1YzZjODBmN2Q1ZWM3NzFhNWVkYTBiOWY3ODMiLCJpYXQiOjE2NDYxNjY3NDMsIm5iZiI6MTY0NjE2Njc0MywiZXhwIjo0ODAxODQwMzQzLCJzdWIiOiIxIiwic2NvcGVzIjpbImNvbXBhbnlfdG9rZW4iXX0.OrdDYHzXdWqs9lGrP8_Wze07mNmhEnILvDuTfQrkLX5k3uMYfxHCBaUuZD5XXn7xBm2yJfaOwKLDo5sIf6J3FCQzzgjAFcr_wDrVt8zWdyQqq8DToqzdU06OB_htE0qJ-TyQEhED9ORRBDoROKMFIeKz_psBwQPjyH8AS34jrELrwW-6X9DioMqTk3Go976EMSL9PvyCBY1VkjVvkexc3eFfoHMiZXHVfmG89fr7ZhAEH81j9mH8Nd_tk3lSBrIBjda5JLm0ec-qWKjn7KNOOoQSbhWL3kyMG9eUT43JGMA-8Qy-OgBn0p2h4i2VuppJ8CD-O9IxaBOYOM9C7o6LuRwlGibb94UIAvbbTGC_i2x_DSfj8TkXstqSvKoZiSQo87M6FBNqngI8nuBxHCFNuPUzJJhRuj4D3YVmZsfzDaJLoV3SgP7ICK8YdUxRyAHpzsCtfbxgpwEFKQDY5LWdJwAvWN-sM3utz92fdHwZVqXLEDC37Be8eVbnNF29Lua4O3N8eBGix8XJ3GpZERy9kDJPQBbG32OOCAT0_c7u6KJaOdjoJ8Gnb6fws2CvBYW8arDgubwcHqu_SOpElupSU4aYhwp60-TiiEdarb82006r9XMHUSiNKAi02rq2wifbqhA-q995G3Y1O-tyKqSNqYRDILFcVjYfKwqzSQBsobE'
                    }
                }
                const url = processedUrl(args);
                const request = await (await fetch(url, config)).json();

                if (request.status === 'success') {
                    commit('setClients', request.customers);
                    commit('setLoading', false);

                }

            } catch (error) {
                console.log(error)
                commit('setLoading', false);
                commit('setClients', [])
            }
        }
    }
})