"use client";

import { createContext, useState, useContext } from "react";
import { jobsAPI } from "@/services/job-api";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const getJobs = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await jobsAPI.getJobs(params);

      setJobs(data.jobs);
      setPage(data.page);
      setPages(data.pages);
      setTotalJobs(data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await jobsAPI.getJobById(id);
      setJob(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData) => {
    try {
      setLoading(true);
      setError(null);
      await jobsAPI.createJob(jobData);
      // Refresh jobs list
      getJobs();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      setLoading(true);
      setError(null);
      await jobsAPI.updateJob(id, jobData);
      // Refresh job details
      getJobById(id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await jobsAPI.deleteJob(id);
      // Refresh jobs list
      getJobs();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (id, resumeUrl) => {
    try {
      setLoading(true);
      setError(null);
      await jobsAPI.applyForJob(id, resumeUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply for job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        job,
        loading,
        error,
        totalJobs,
        page,
        pages,
        getJobs,
        getJobById,
        createJob,
        updateJob,
        deleteJob,
        applyForJob,
      }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
