import axios from 'axios'
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const applicationView = createAsyncThunk(
    'job/data', async({ currentPage,  name }, {rejectWithValue })=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/job-portal/userData`,
                {
                    params: {
                        page: currentPage, 
                        name: name,        
                    },
                    withCredentials: true, 
                }
            )
            return response.data

        } catch (error) {
            return rejectWithValue (error.response?.data?.message || 'failed to get user data ')
            
        }
    }
) 

const applicantsData = createSlice({
    name : 'applicants' ,
    initialState :{
        user : [] ,
        status:'idle',
        error:null,
        isLoggedIn : false,
        totalPages :0 
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(applicationView.pending, (state)=>{
            state.status = "pending";
            state.error = null ;
        })
        .addCase(applicationView.fulfilled, (state, action)=>{
            state.user = action.payload.data;
            state.totalPages = action.payload.totalPages;
            state.status = 'success' ;
            state.isLoggedIn = true ;
        })
        .addCase(applicationView.rejected, (state, action)=>{
            state.status ='failed' ;
            state.error = action.payload ;
        })
    }
})

export default applicantsData.reducer;