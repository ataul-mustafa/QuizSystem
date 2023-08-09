import axios from "axios";
import { SAVE_UNIQUE_ID, SAVE_UNIQUE_ID_FAIL, SAVE_UNIQUE_ID_ERROR } from '../reducers/uniqueIdReducer';



export const compareSaveUniqueId = (info) => async (dispatch) => {
    try {
        const id = {
            uniqueId: info
        }
      const { data } = await axios.post("/api/uniqueId", id);
  
      if (data.success) {
        dispatch(SAVE_UNIQUE_ID(data.uniqueId));
      } else {
        dispatch(SAVE_UNIQUE_ID_FAIL(data.msg));
      }
  
    } catch (error) {
      dispatch(SAVE_UNIQUE_ID_ERROR(error.response.data.message));
    }
  };