import cloudinary from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config({ 
    cloud_name: 'dgbgtsnbi', 
    api_key: process.env.REACT_APP_CLOUDINARY_KEY, 
    api_secret: process.env.REACT_APP_CLOUDINARY_APISECRET,
    secure: true
});

describe('Test in fileUpload', () => {

    test('should load a file and return null', async (done) => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')

        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');

        const url = await fileUpload( file ); 

        expect( typeof url ).toBe('string');

        //delete image
        const segment = url.split('/');
        const imageId = segment[ segment.length - 1 ].replace('.png','');
        console.log(imageId);
        cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
            done();
        });
    })


    test('should return an error', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect( url ).toBe(null);
    })
    
    
})