import { App, Modal, Typography, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile, UploadFileStatus } from 'antd/es/upload/interface';
import { omit } from 'lodash-es';
import React, { useId, useState } from 'react';

/** file to base64 */
const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => resolve('');
  });
};

interface SingleUploadProps<Response extends { fileUri: string | number } | void>
  extends Omit<
    UploadProps,
    | 'action'
    | 'method'
    | 'headers'
    | 'withCredentials'
    | 'data'
    | 'name'
    | 'customRequest'
    | 'fileList'
    | 'directory'
    | 'onChange'
    | 'multiple'
    | 'maxCount'
    | 'itemRender'
    | 'showUploadList'
    | 'defaultFileList'
  > {
  value?: string;
  onChange?: (fileUri: string) => void;
  service: (file: RcFile) => Promise<Response>;
}

const getTitleFromImgUrl = (url?: string) => {
  return url?.substring(url?.lastIndexOf('/') + 1) ?? '';
};

const SingleUpload: React.FC<SingleUploadProps<{ fileUri: string | number } | void>> = (props) => {
  const { message } = App.useApp();
  const { service, accept = 'image/*', value } = props;
  const uid = useId();

  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [status, setStatus] = useState<UploadFileStatus>();
  const [fileList, setFileList] = useState<UploadFile[]>(
    value
      ? [
          {
            uid,
            name: getTitleFromImgUrl(value),
            url: value,
          },
        ]
      : [],
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewOpen(true);
    setPreviewImage(file.url || (file.preview as string));
    setPreviewTitle(file.name || getTitleFromImgUrl(file?.url));
  };
  const handleCancel = () => setPreviewOpen(false);
  const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
    if (file.status === 'done') {
      message.success(`${file.name} 上传成功`);
    }
    if (file.status === 'error') {
      message.error(`${file.name} 上传失败，请重试`);
    }
    setStatus(file.status);
    setFileList(newFileList);
  };

  const handleUpload: UploadProps['customRequest'] = async (option) => {
    const { file, onSuccess, onError } = option;
    try {
      const resData = await service(file as RcFile);
      props?.onChange?.(String(resData?.fileUri));
      // onSuccess 回调将被赋值给 file.response
      onSuccess?.(resData?.fileUri);
    } catch (error) {
      if (error instanceof Error) {
        onError?.(error);
      }
    }
  };

  return (
    <div>
      <Upload
        accept={accept}
        listType="picture-card"
        fileList={fileList}
        maxCount={1}
        multiple={false}
        customRequest={handleUpload}
        onChange={handleChange}
        showUploadList={true}
        onPreview={handlePreview}
        disabled={props?.disabled || status === 'uploading'}
        {...omit(props, ['onChange'])}
      >
        {fileList.length < 1 && <Typography.Text type="secondary">+ 上传</Typography.Text>}
      </Upload>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt={previewTitle} style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default SingleUpload;
