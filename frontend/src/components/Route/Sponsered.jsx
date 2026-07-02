import React from "react";
import styles from "../../styles/styles";

const Sponsered = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png"
            alt="spnosered_Image"
            className="w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTyn9SwCkPFBWP81F6fYZ9LqVSex2fiDkJVw&s"
            alt="spnosered_Image"
            className="w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt="spnosered_Image"
            className="w-[150px] object-contain"

          />
        </div>
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvR10wPNSA6ptx1XqbuKj1FLF62uYRfe5d-w&s"
            alt="spnosered_Image"
            className="w-[150px] object-contain"

          />
        </div>
        <div className="flex items-start">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAeFBMVEX///8AAAD8/Pz39/fs7Oz09PS5ubmvr6/c3NzR0dG8vLzKysqnp6dvb29hYWFWVlY9PT2YmJh9fX0wMDA1NTVRUVHp6elERETY2NiFhYVzc3OhoaGTk5OoqKh/f39bW1sLCwsdHR0pKSkWFhYiIiLGxsaLi4s7Ozsa4oFzAAAFD0lEQVR4nO2d6XLqMAyFs0AT9oayQ2kopX3/N7wQyhZkkktiyVL1/YYZ+YzjyNKx43mKoiiKoiiKoigWCRsBdQgsCOJk8Ob7M+o4GNAapn5GizoS54m+/BMq1mMS/woV6xEvqa9ilWMy9m+JqSNyl8jPo6mDid6dVj51SK4SvN5r9UEdlKOEb/da+SvqqNwkGAFa6csQJv8a1CXLzBDUakEdlpO8gFrpUwgxgbV6o47LSaawWBF1XC5yn7hnbKnjcpEQ1spvUwfmIitYqyl1XC5imlgT6sBcJIG1SqjjcpINqNWYOiwn6YBapU3quJxkAYqlLTAQUKsddVRuEkNavVBH5ShL1ao8wJKlmbuJ+z20ru1G8lJNNWcwEuS00rz9Ac0bqca6H3zEtViDDnU0jnN+DDdztTUUsvH97XjYhZQKwj/ndAhn7WS+Xgzn3U6j5F+CWXf4uskm3Od0mHT+xguyEeVyzkVUuIS3VoDnYRGVFZopzSXYtHldmfUKOosU+k+WgHXlTrAZ4B86MVqC86Q1N/8loyczuY9h68KF8Utu8Z6sPgv+cmAg75XZfDCrLvQvesVJGaUyFiHlyOrH0DOFJkrSCpu7NeTMMiOpMBj2/2voTzCkHmJtxFvbWu1fjEIexbZ9qfZsRGRd7yha7RGQc0EFdVULpvxrsDoj6sFWBO4t26JHPdxKGLyO1uhSD7gKX8Xjq5M552LXGlWqDes9dQtVqz7naYX8EC6pR1sNg33PDsz7+w1Mrbifu8Bc3bl3FzEnFns/0jeeVuyPa+bdHRbhb2I2HICzAftigwd0RS3B/5wY3vLOvS7jYZb8uGcNewZYWr1Sj7Q6zeJR1gT7FAuxQJryLjVkoC1ZEpqrH1hiSejbo1WyBPShTad2a+eHeqQ1AB7rssGceqQ1gONu8CVsdRDtDQLSd6/ICFobEhySpSyRdSDhXA+aWPxLWZ5n3RWpYqlYdpFgjUQTS8ICjyaWhNQBTSwJRQe01IG10+8XNLEk1P7QtjsSLuLsYoklIdHC690z97AdwDOT8na+Z+C1DQV8owHRbySgyQreem8FAS0LtBSev/UW9dwcf2fIDk8s/tkD6mkw9i/E0ncy1AD7XAttK32Ae6sVrc2awbwGiOZ2OMK8Fo8rVsrbegRfvG2NLetaDWamdSDlvG6h+dnOcG5eoNlKzzA+HIabPGRM2b4U8Z9Dn/HkQjuRcs32nXrYz4FmLL0lZVk7JXkOfa6FZvjLl9ahHvZzIO8Pf+Ha0cc7+nsF19t7EA+Vn+HrfiAQi+/9PahX9xzhW5BH7Ez/wvnkE+IdK0fY7g49VIdIBu/PlyNPLd5Wb9ypxb2DiPpC5LxiZSBcb35iTT3WyiCm8bz7YRngx2NsIOEEAZajRsDdUJ7xO/Z1w7XckOP/vnTyJPxX9yMYVcAt9SBrA8Fiyt+He8Z6W+ybeoQ1YnvXI8ANf4Xlq9rY73NusZo/sHd35yn6YF8FpGQNF0JrO+op9dAsYC3bYu2QNGHJOSlkm5PHSm4qbnE/YaEiz7epWkjt37Vga/UrQ81zS7RWJRoYH9/RrtNqddrv88LUjPsJp0IeuScHUc76Hyc/D34u4S7JAmJDLfAj/83tI42u4XT6WGR+dQewT/xKHuyFZ8BBoC1P6+gTTG7fium8qHQXtG/1GjF1cD9HMzqt3v1uySNKs/fe5vi8LjkfanqSRhzzNnIoiqIoiqIotfAPMn1L3B4ltyUAAAAASUVORK5CYII="
            alt="spnosered_Image"
            className="w-[150px] object-contain"

          />
        </div>
      </div>
    </div>
  );
};

export default Sponsered;
