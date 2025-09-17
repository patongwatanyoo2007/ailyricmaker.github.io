document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const topicInput = document.getElementById('topic');
    const languageInput = document.getElementById('language');
    const lyricsOutputDiv = document.getElementById('lyricsOutput');
    const lyricsContentPre = document.getElementById('lyricsContent');
    const loader = document.getElementById('loader');

    generateBtn.addEventListener('click', async () => {
        const topic = topicInput.value;
        const language = languageInput.value;

        if (!topic || !language) {
            alert('กรุณาใส่หัวข้อและภาษาที่ต้องการ');
            return;
        }

        // Show loader and hide previous lyrics
        loader.style.display = 'block';
        lyricsOutputDiv.style.display = 'none';
        lyricsContentPre.textContent = '';
        generateBtn.disabled = true;
        generateBtn.textContent = 'กำลังสร้าง...';

        try {
            const response = await fetch('/generate-lyrics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic, language })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong.');
            }

            const data = await response.json();
            lyricsContentPre.textContent = data.lyrics;

            // Show lyrics output
            lyricsOutputDiv.style.display = 'block';

        } catch (error) {
            console.error('Error:', error);
            lyricsContentPre.textContent = 'ขออภัย เกิดข้อผิดพลาดในการสร้างเนื้อเพลง กรุณาลองใหม่อีกครั้ง';
            lyricsOutputDiv.style.display = 'block';
        } finally {
            // Hide loader and enable button
            loader.style.display = 'none';
            generateBtn.disabled = false;
            generateBtn.textContent = 'สร้างเนื้อเพลง';
        }
    });
});