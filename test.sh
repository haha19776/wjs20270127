#!/bin/bash
npm run dev &
sleep 3
curl "http://localhost:3000/api/search-news?query=test"
echo "브라우저에서 http://localhost:3000 확인하세요!"
