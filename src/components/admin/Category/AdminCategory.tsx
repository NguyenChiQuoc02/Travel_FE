'use client'

import { categoryService } from '@/axios/service/index';
import React, { useState , useEffect} from 'react';

const CreateCategory = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [response, setResponse] = useState<any | null>(null);
  const [page, setPage] = useState(0);
  const size= 10;
  const [search, setSearch] = useState<string>('');
 
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await categoryService.fetchCategories({page,size});
        console.log("check api>>",response);
      } catch (error) {
        console.log("Error fetching student data:", error);
      }
    };
    fetchCategoryData();
  }, []);
  
  // const handleSubmit = async () => {
  //   try {
  //     const category = { name, description };
  //     const res = await categoryService.createCategory(category);
  //     setResponse(res);
  //     console.log('Response từ server:', res);
  //   } catch (error) {
  //     console.error('Lỗi khi tạo danh mục:', error);
  //   }
  // };

  return (
    <div>
      <h2>Tạo Danh Mục Mới</h2>
      <input
        type="text"
        placeholder="Tên danh mục"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mô tả danh mục"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* <button onClick={handleSubmit}>Tạo Danh Mục</button> */}
      {response && (
        <div>
          <h3>Kết quả từ server:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
