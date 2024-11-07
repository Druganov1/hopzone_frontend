import React from 'react';
import { MdWarning } from 'react-icons/md';

const ConnectionError = () => {
  return(
<div className=' text-orange-800 flex items-center gap-2'>
    <MdWarning size={24}/>
    <span>Failed to connect!</span>
</div>
  ) 
};

export default ConnectionError;
