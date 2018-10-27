import {
  UPDATE_CANVAS,
  EDIT_SENTENCE,
  SELECT_SENTENCE,
  EDIT_GLOBAL,
} from '../types/canvas-types'

export const updateCanvas = (sentence) => ({
  type: UPDATE_CANVAS,
  payload: sentence,
})

export const editSentence = (sentenceConfig) => ({
  type: EDIT_SENTENCE,
  payload: sentenceConfig,
})

export const selectSentence = (sentenceId) => ({
  type: SELECT_SENTENCE,
  payload: sentenceId,
})

export const editGlobal = (globalConfig) => ({
  type: EDIT_GLOBAL,
  payload: globalConfig,
})