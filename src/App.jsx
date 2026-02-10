import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landingpage } from './Landingpage'
import { Elogin } from './Components-EmployerSignup/Elogin'
import { Jlogin } from './Components-JobseekerSignup/Jlogin'
import { Jsignup } from './Components-JobseekerSignup/Jsignup'
import { Jcreatepassword } from './Components-JobseekerSignup/Jcreatepassword'
import { Jforgotpassword } from './Components-JobseekerSignup/Jforgotpassword'
import { Afterloginlanding } from './Components-Jobseeker/Afterloginlanding'
import { Esignup } from './Components-EmployerSignup/Esignup'
import { Eforgotpassword } from './Components-EmployerSignup/Eforgotpassword'
import { Ecreatepassword } from './Components-EmployerSignup/Ecreatepassword'
import { OpportunityOverview } from './Components-Jobseeker/OpportunityOverview'
import { MyJobs } from './Components-Jobseeker/MyJobs'
import { JobsTab } from './Components-Jobseeker/JobsTab'
import { CompaniesTab } from './Components-Jobseeker/CompaniesTab'
import { MyProfile } from './Components-Jobseeker/MyProfile'
import { JobsThroughCompany } from './Components-Jobseeker/JobsThroughCompany'
import { AboutUs } from './Components-LandingPage/AboutUs'
import Apply from './Components-Jobseeker/Apply'
import AppliedSuccessfull from './Components-Jobseeker/AppliedSuccessfull'
import { HelpCenter } from './Components-Jobseeker/HelpCenter'
import {RaiseTicket} from './Components-Jobseeker/RaiseTicket'
import { HelpFAQ } from './Components-Jobseeker/HelpFAQ'
import { LiveChat } from './Components-Jobseeker/LiveChat'
import { ProfileCreationHelp } from './Components-Jobseeker/ProfileCreationHelp'
import { ResumeUploadHelp } from './Components-Jobseeker/ResumeUploadHelp'
import { JobApplyIssuesHelp } from './Components-Jobseeker/JobApplyIssuesHelp'
import { InterviewSchedulingHelp } from './Components-Jobseeker/InterviewSchedulingHelp'
import { JobPostingHelp } from './Components-Jobseeker/JobPostingHelp'
import { CandidateSearchHelp } from './Components-Jobseeker/CandidateSearchHelp'
import { SubscriptionIssuesHelp } from './Components-Jobseeker/SubscriptionIssuesHelp'
import { InvoicePaymentHelp } from './Components-Jobseeker/InvoicePaymentHelp'
import { LoginIssuesHelp } from './Components-Jobseeker/LoginIssuesHelp'
import { PageErrorsHelp } from './Components-Jobseeker/PageErrorsHelp'
import { FileUploadHelp } from './Components-Jobseeker/FileUploadHelp'

const router = createBrowserRouter([{
  path: '/Job-portal',
  element: <Landingpage />,
},
{
  path: '/Job-portal/jobseeker/login',
  element: <Jlogin />,
},
{
  path: '/Job-portal/jobseeker/login/forgotpassword',
  element: <Jforgotpassword />,
},
{
  path: '/Job-portal/jobseeker/signup',
  element: <Jsignup />,
},
{
  path: '/Job-portal/jobseeker/login/forgotpassword/createpassword',
  element: <Jcreatepassword />,
},
{
  path: '/Job-portal/jobseeker/',
  element: <Afterloginlanding />,
},
{
  path: '/Job-portal/employer/login',
  element: <Elogin />,
},
{
  path: '/Job-portal/employer/signup',
  element: <Esignup />,
},
{
  path: '/Job-portal/employer/login/forgotpassword',
  element: <Eforgotpassword />,
},
{
  path: '/Job-portal/employer/login/forgotpassword/createpassword',
  element: <Ecreatepassword />,
},
{
  path: '/Job-portal/jobseeker/OpportunityOverview/:id',
  element: <OpportunityOverview />,
},
{
  path: '/Job-portal/jobseeker/apply/:id',
  element: <Apply/>,
},
{
  path: '/Job-portal/jobseeker/applied-success',
  element: <AppliedSuccessfull/>,
},
{
  path: '/Job-portal/jobseeker/myjobs',
  element: <MyJobs />,
},
{
  path: '/Job-portal/jobseeker/jobs',
  element: <JobsTab />,
},
{
  path: '/Job-portal/jobseeker/companies',
  element: <CompaniesTab />,
},
{
  path: '/Job-portal/jobseeker/myprofile',
  element: <MyProfile />,
},
{
  path: '/Job-portal/jobseeker/help-center',
  element: <HelpCenter />,
},
{
  path: '/Job-portal/jobseeker/help-center/raise-a-ticket',
  element: <RaiseTicket />,
},
{
  path: '/Job-portal/jobseeker/help-center/help-FAQs',
  element: <HelpFAQ />,
},
{
  path:'/Job-portal/jobseeker/help-center/live-chat',
  element: <LiveChat />,
},
{
  path:'/Job-portal/jobseeker/help-center/profile-creation-help',
  element: <ProfileCreationHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/resume-upload-help',
  element: <ResumeUploadHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/job-apply-help',
  element: <JobApplyIssuesHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/interview-scheduling-help',
  element: <InterviewSchedulingHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/job-posting-help',
  element: <JobPostingHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/candidate-search-help',
  element: <CandidateSearchHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/subscription-issue-help',
  element: <SubscriptionIssuesHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/invoice-payment-help',
  element: <InvoicePaymentHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/login-issue-help',
  element: <LoginIssuesHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/page-error-help',
  element: <PageErrorsHelp />,
},
{
  path:'/Job-portal/jobseeker/help-center/file-upload-help',
  element: <FileUploadHelp />,
},
{
  path: '/Job-portal/aboutus',
  element: <AboutUs />,
},
{
  path: '/Job-portal/jobseeker/companies/:companyId',
  element: <JobsThroughCompany />,
}])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
