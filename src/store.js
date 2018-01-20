import Vue from 'vue'
import Vuex from 'vuex'
import {firebaseMutations,firebaseAction} from 'vuexfire'


Vue.use(Vuex);

export const store = new Vuex.Store({
	mutations: {...firebaseMutations},

	state: {
		data: {
			name:"Text"
		},
	},
	
	actions: {
		setData: firebaseAction(({bindFirebaseRef},obj) => {
			bindFirebaseRef("data",obj.ref);
		})
	},
	getters: {
		data: function(state) {
			return state.data;
		}
	}

})
