import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchAvailableSessions = async (subjectId, batchId) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await axios.get(`${API_URL}/api/utils/available-sessions?subjectId=${subjectId}&batchId=${batchId || ''}&date=${today}`);
    return response.data.availableSessions;
  } catch (error) {
    console.error('Error fetching available sessions:', error);
    return [];
  }
};

export const fetchSubjectData = async (subjectId) => {
  try {
    const response = await axios.get(`${API_URL}/api/utils/subjectBatch?subjectId=${subjectId}`);
    return response.data.subject;
  } catch (error) {
    console.error('Error fetching subject data:', error);
    return null;
  }
};

export const fetchSubjectDetails = async (subjectId, batchId, selectedDate, selectedSessions) => {
  try {
    const response = await axios.get(`${API_URL}/api/utils/batches?_id=${subjectId}&batchId=${batchId || ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subject details:', error);
    return { students: [], attendanceRecord: null };
  }
};

export const updateAttendance = async (attendanceData) => {
  try {
    const response = await axios.put(`${API_URL}/api/attendance`, attendanceData);
    return response.data;
  } catch (error) {
    console.error('Failed to update attendance:', error);
    throw error;
  }
};

