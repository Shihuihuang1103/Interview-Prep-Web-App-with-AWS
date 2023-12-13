// "use client"
// import NavInterviewee from '@/app/components/navInterviewee';
// import { useRouter } from 'next/router';
// import { useState } from 'react';


// const SubmitFeedback = () => {
//     const router = useRouter();
//     const { interviewId } = router.query;
//     const [rating, setRating] = useState('');
//     const [comment, setComment] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         //validating rating and comment are not empty

//         const feedbackData = {
//           interviewId,
//           rating,
//           comment,
//           submissionTime: new Date().toISOString(),
//         };
    
//         try {
//           const apiGatewayUrl = `https://6lpyoj0hu8.execute-api.us-east-1.amazonaws.com/test/feedback`;
//           const response = await fetch('/api/submitFeedback', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(feedbackData),
//           });
    
//           if (!response.ok) {
//             throw new Error('Failed to submit feedback');
//           }
    
//           alert('You have successfully submitted your feedback.')
//         } catch (error) {
//           console.error('Error submitting feedback', error);
//         }
//       };
      
      
//     return (
//         <div className="flex flex-col min-h-screen">
//         <NavInterviewee />
//         <div className="flex min-h-screen bg-gray-50 justify-center items-center">
//             <div className="p-6 max-w-sm w-full bg-blue-50 shadow-md rounded-md">
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                     <h1 className='text-center font-bold text-2xl text-blue-800'> 
//                         Submit Your Feedback 
//                     </h1>
//                     <br/>
//                     <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rate Your Interview Experience:</label>
//                     <select 
//                       id="rating" 
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value = {rating}
//                       onChange={(e)=>setRating(e.target.value)}
//                     >
//                     <option value="5">5</option>
//                     <option value="4">4</option>
//                     <option value="3">3</option>
//                     <option value="2">2</option>
//                     <option value="1">1</option>
//                     </select>
//                     </div>
//                     <div className="mb-6">
//                     <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
//                         Write Your Comment:
//                     </label>
//                     <textarea
//                         type="text"
//                         id="comment"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                     />
//                     </div>
                    
//                     <div>
//                     <button type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center">
//                         Submit
//                     </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//     );
// };

// export default SubmitFeedback;