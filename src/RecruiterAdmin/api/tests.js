import { pythonUrl } from "../../utils/ApiConstants";
const BASE_URL = `${pythonUrl}/v1`;

export const testApi = {
  startTest: async (questionSetId, orgId) => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (orgId) headers['X-Org-Id'] = orgId;
      
      const response = await fetch(`${BASE_URL}/test/start/${questionSetId}`, { headers });
      if (!response.ok) throw new Error('Failed to fetch test');
      return await response.json();
    } catch (error) {
      console.error('Error starting test:', error);
      throw error;
    }
  },

  submitSection: async (questionSetId, submissionData, orgId) => {
    try {
      const url = questionSetId
        ? `${BASE_URL}/test/submit_section/${encodeURIComponent(questionSetId)}`
        : `${BASE_URL}/test/submit_section`;
      
      const headers = { 'Content-Type': 'application/json' };
      if (orgId) headers['X-Org-Id'] = orgId;

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(submissionData),
      });
      const text = await response.text();
      try {
        const json = text ? JSON.parse(text) : null;
        if (!response.ok) {
          console.error('submitSection server error:', response.status, json || text);
          throw new Error(json?.message || `Failed to submit test (${response.status})`);
        }
        return json;
      } catch (parseErr) {
        if (!response.ok) {
          console.error('submitSection server error (non-json):', response.status, text);
          throw new Error(`Failed to submit test (${response.status})`);
        }
        return text;
      }
    } catch (error) {
      console.error('Error submitting section:', error);
      throw error;
    }
  },
  saveViolations: async (payload, orgId) => {
    try {
      console.log("Payload in test.js", payload);
      const headers = { 'Content-Type': 'application/json' };
      if (orgId) headers['X-Org-Id'] = orgId;

      const response = await fetch(`${BASE_URL}/save_violations`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to save violations');
      return await response.json();
    } catch (error) {
      console.error('Error saving violations:', error);
      throw error;
    }
  },
  createSession: async (payload = {}, orgId) => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (orgId) headers['X-Org-Id'] = orgId;

      const response = await fetch(`${BASE_URL}/test/create_session`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to create session');
      return await response.json();
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },
  getVideoUrl: async (attemptId, orgId) => {
    try {
      if (!attemptId) return { video_url: null };
      const url = `${BASE_URL}/test/video_url?attempt_id=${encodeURIComponent(attemptId)}`;
      
      const headers = { 'Content-Type': 'application/json' };
      if (orgId) headers['X-Org-Id'] = orgId;

      const response = await fetch(url, { headers });
      const text = await response.text();
      try {
        const json = text ? JSON.parse(text) : null;
        if (!response.ok) {
          console.error('getVideoUrl server error:', response.status, json || text);
          throw new Error(json?.error || `Failed to get video url (${response.status})`);
        }
        return json;
      } catch (parseErr) {
        if (!response.ok) {
          console.error('getVideoUrl server error (non-json):', response.status, text);
          throw new Error(`Failed to get video url (${response.status})`);
        }
        return { video_url: text };
      }
    } catch (error) {
      console.error('Error getVideoUrl:', error);
      throw error;
    }
  },
};