import * as ActionTypes from '../constants/constants';
import axios from 'axios'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:8000/api' : '/api';

export function toggleSketch() {
	return {
		type: ActionTypes.TOGGLE_SKETCH
	}
}

export function startSketch() {
	return {
		type: ActionTypes.START_SKETCH
	}
}

export function stopSketch() {
	return {
		type: ActionTypes.STOP_SKETCH
	}
}

export function openPreferences() {
	return {
		type: ActionTypes.OPEN_PREFERENCES
	}
}

export function closePreferences() {
	return {
		type: ActionTypes.CLOSE_PREFERENCES
	}
}

export function increaseFont() {
	return {
		type: ActionTypes.INCREASE_FONTSIZE
	}
}

export function decreaseFont() {
	return {
		type: ActionTypes.DECREASE_FONTSIZE
	}
}

export function saveProject() {
	return function(dispatch, getState) {
		var state = getState();
		var formParams = Object.assign({}, state.project);
		formParams.file = state.file;
		if (state.id) {
			axios.put(`${ROOT_URL}/projects/${state.id}`, formParams, {withCredentials: true})
				.then(response => {
					dispatch({
						type: ActionTYpes.PROJECT_SAVE_SUCCESS
					})
					.catch(response => dispatch({
						type: ActionTypes.PROJECT_SAVE_FAIL
					}));
				})
		}
		else {
			axios.post(`${ROOT_URL}/projects`, formParams, {withCredentials: true})
				.then(response => {
					browserHistory.push('/' + response.data.id);
					dispatch({
						type: ActionTypes.NEW_PROJECT,
						name: response.data.name,
						id: response.data.id,
						file: {
							name: response.data.file.name,
							content: response.data.file.content
						}
					});
				})
				.catch(response => dispatch({
					type: ActionTypes.PROJECT_SAVE_FAIL
				}));
		}
	}
}


export function createProject() {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/projects`, {}, {withCredentials: true})
			.then(response => {
				dispatch({
					type: ActionTypes.NEW_PROJECT,
					name: response.data.name,
					id: response.data.id,
					file: {
						name: response.data.file.name,
						content: response.data.file.content
					}
				});
				browserHistory.push('/' + response.data.id);
			})
			.catch(response => dispatch({
				type: ActionTypes.PROJECT_SAVE_FAIL
			}));
	}
}
