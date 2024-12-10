// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { Box, Grid } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

interface FileProp {
  name: string
  type: string
  size: number
}

const FileUploader = ({ handleUpload, removeFiles }: { handleUpload: (file: File) => void; removeFiles: boolean }) => {
  // ** State
  const [files, setFiles] = useState<File[]>([])
  const [isHovered, setIsHovered] = useState(false)

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 3000000,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      setIsHovered(false)
    },
    onDropRejected: rejectedFiles => {
      setIsHovered(false)
      rejectedFiles.forEach(file => {
        if (file.errors) {
          file.errors.forEach(error => {
            if (error.code === 'file-too-large') {
              toast.error(
                <>
                  El archivo excede el tamaño permitido de
                  <Typography component='span' fontWeight={600}>
                    {' '}
                    3MB.
                  </Typography>
                </>,
                {
                  autoClose: 10000
                }
              )
            } else if (error.code === 'file-invalid-type') {
              toast.error(
                <>
                  Solo se permiten archivos <Typography fontWeight={600}>.pdf | .doc | .docx | .jpg | .jpeg</Typography>
                </>,
                {
                  autoClose: 10000
                }
              )
            } else {
              toast.error('Ha ocurrido un error, favor intenta nuevamente', {
                autoClose: 10000
              })
            }
          })
        }
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <i className='ri-user-3-line text-[1.2em]' />
    }
  }

  useEffect(() => {
    if (removeFiles) {
      handleRemoveAllFiles()
    }
  }, [removeFiles])

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleDragEnter = () => {
    setIsHovered(true)
  }

  const handleDragLeave = () => {
    setIsHovered(false)
  }

  return (
    <Grid container justifyContent={'center'}>
      {!files.length ? (
        <Grid item xs={10} mb={10}>
          <div
            {...getRootProps({ className: 'dropzone' })}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            style={{
              border: isHovered ? '2px solid #2b8bf8' : undefined,
              transition: 'border 0.3s ease',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            <input {...getInputProps()} />
            <Box display='flex' flexDirection='column' alignItems='center' style={{ pointerEvents: 'none' }}>
              <Typography variant='h6' color={isHovered ? '#2b8bf8' : 'text.primary'}>
                Haz click o arrastra un archivo aquí
              </Typography>
              <Typography variant='body2' color={isHovered ? '#2b8bf8' : 'text.primary'} mt={1}>
                Archivos permitidos: *.pdf, *.jpg, *.jpeg, *.png (máximo 3 MB)
              </Typography>
            </Box>
          </div>
        </Grid>
      ) : (
        <Grid
          container
          item
          xs={10}
          mb={5}
          gap={1}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            border: theme => `2px solid ${theme.palette.grey}`,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: 1
          }}
        >
          <Grid item>
            <List>{fileList}</List>
          </Grid>
          <Grid item>
            <Grid container gap={4} m={4}>
              <Button size='small' color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                Quitar
              </Button>
              <Button variant='contained' onClick={() => handleUpload(files[0])}>
                Procesar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default FileUploader
