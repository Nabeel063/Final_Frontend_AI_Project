# Analysis of Proctoring Activity Data Issue (Zero Values)

This report outlines the cause and proposed fixes for the issue where "Tab switches", "Inactivities", "Face Not Visible", and "Multi Face Detected" consistently show zero in the recruiter's `ViewResults.jsx`, even when notifications were shown to the candidate and auto-submission occurred.

## Root Causes

### 1. API Endpoint Mismatch (Critical)
There is a mismatch between the frontend API call and the backend route definition for saving violations.
- **Frontend (`src/RecruiterAdmin/api/tests.js`):**
  Calls `POST ${pythonUrl}/v1/test/save_violations`.
- **Backend (`app/api/test.py`):**
  Defines `@test_bp.route("/save_violations", methods=["POST"])` with a blueprint prefix of `/ai/v1`.
- **Final Backend URL:** `http://localhost:5000/ai/v1/save_violations`.
- **Result:** The frontend is calling `/ai/v1/test/save_violations` (notice the extra `/test/`), which likely results in a **404 Not Found**. Consequently, violation data is never persisted to the database.

### 2. Auto-Submit vs. Data Persistence
The "auto-submit" functionality works correctly because it is handled **locally** within the candidate's browser (`GiveTest.jsx`). The frontend monitors violations and triggers the `handleSubmitAllSections` function when thresholds are met. However, the final step of that function—calling `testApi.saveViolations`—fails due to the endpoint mismatch described above.

### 3. Field Naming/Missing Fields
In `GiveTest.jsx`, the final payload sent to `saveViolations` was recently patched to include `multiple_faces`. If this fix was not in place, it could have been contributing to missing data.

---

## Proposed Fixes

### Fix A: Align Frontend API Endpoint
Correct the URL in the frontend `testApi` to match the backend route.

**File:** `src/RecruiterAdmin/api/tests.js`
```diff
- const BASE_URL = `${pythonUrl}/v1`;
+ // pythonUrl already ends with /ai in ApiConstants.jsx
+ const BASE_URL = `${pythonUrl}/v1`; 

  saveViolations: async (payload, orgId) => {
    try {
-     const response = await fetch(`${BASE_URL}/test/save_violations`, {
+     const response = await fetch(`${BASE_URL}/save_violations`, {
        method: 'POST',
        // ... rest of the code
```

### Fix B: Backend Route Adjustment (Alternative)
Alternatively, change the backend route to match the current frontend expectation if preferred.

**File:** `app/api/test.py` (Python Backend)
```diff
- @test_bp.route("/save_violations", methods=["POST"])
+ @test_bp.route("/test/save_violations", methods=["POST"])
  def save_violations():
      # ...
```

## Summary
The primary reason for zero values is the **404 error** during the violation save process at the end of the test. Fixing the API URL will allow the data to be stored in MongoDB, making it visible in the Recruiter Dashboard.
