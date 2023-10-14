// portone.d.ts
// ������ ��ũ��
// https://github.com/junhoyeo/iamport-typings
// ���Ĺ���
export interface RequestPayAdditionalParams {
    /**
     * ### ������ ������
     * - �޴��� ���������� ��� �ʼ� �׸�
     * - ������ǰ�� �ǹ��� �ƴ� ��� true
     * - �ǹ�/������ ���ο� ���� ���������� �����ϰ� ������
     */
    digital?: boolean;
    /**
     * ### ������� �Աݱ���
     * - ���������� ��������� ��� �Աݱ����� ������ �� �ֽ��ϴ�.
     * @example
     * - YYYY-MM-DD
     * - YYYYMMDD
     * - YYYY-MM-DD HH:mm:ss
     * - YYYYMMDDHHmmss
     */
    vbank_due?: string;
    /**
     * ### �����Ϸ����� �̵��� EndPoint URL �ּ�
     * - ����â�� ���ο� â���� �����̷�Ʈ �Ǿ� ������ ����Ǵ� ���� ����� ��� �ʼ� ���� �׸� �Դϴ�.
     * - ��κ��� ����� ����ȯ�濡�� ����â ȣ��� �ʼ� �׸��Դϴ�.
     * - �����̷�Ʈ ȯ�濡�� �ش� �ʵ� ������ ���� ����� ���� ���� ���մϴ�.
     */
    m_redirect_url?: string;
    /**
     * ### ����� �� ������ ������ �ۺ��͸� ���� URL scheme
     * - WebView ȯ�� ������ �ʼ����� �׸� �Դϴ�.
     * - ISP/��ī�� �ۿ��� ������������ �� ���� ������ ������ �� ����մϴ�.
     */
    app_scheme?: string;
    /**
     * ### ����ڵ�Ϲ�ȣ
     * - �ٳ�-������� �������� ���� �ʼ� �׸�
     */
    biz_num?: string;
}

/**
 * Interface for Display configurations.
 *
 * @property {number[]} [card_quota] - �Һΰ����� 5���� �̻� ���� ��û�ÿ��� �̿� �����մϴ�.
 *
 * @example
 * // �ϽúҸ� ���� ����
 * { card_quota: [] }
 *
 * @example
 * // �Ͻú��� ������ 2, 3, 4, 5, 6�������� �Һΰ��� ���� ����
 * { card_quota: [2,3,4,5,6] }
 */
export interface Display {
    card_quota?: number[];
}

// TODO: �ٽ� Ȯ�� �ʿ�, ���Ĺ������� ���������� �ٸ� ������ �˷��ְ�����
type PG =
    | "html5_inicis"
    | "inicis"
    | "kcp"
    | "kcp_billing"
    | "uplus"
    | "nice"
    | "kicc"
    | "bluewalnut"
    | "kakaopay"
    | "danal"
    | "danal_tpay"
    | "mobilians"
    | "payco"
    | "paypal"
    | "eximbay"
    | "naverpay"
    | "naverco"
    | "smilepay"
    | "alipay"
    | "paymentwall"
    | "tosspay"
    | "smartro"
    | "settle"
    | "settle_acc"
    | "daou"
    | "tosspayments"
    | "paypal_v2"
    | "nice_v2"
    | "smartro_v2"
    | "ksnet";

type PaymentMethod =
    | "card"
    | "trans"
    | "vbank"
    | "phone"
    | "paypal"
    | "applepay"
    | "naverpay"
    | "samsung"
    | "kpay"
    | "kakaopay"
    | "payco"
    | "lpay"
    | "ssgpay"
    | "tosspay"
    | "cultureland"
    | "smartculture"
    | "happymoney"
    | "booknlife"
    | "point"
    | "wechat"
    | "alipay"
    | "unionpay"
    | "tenpay";

interface EscrowProduct {
    id: string;
    /** ��ǰ�� */
    name: string;
    /** ��ǰ �ڵ� */
    code: string;
    /** ��ǰ ���� ���� */
    unitPrice: number;
    /** ���� */
    quantity: number;
}

interface Card {
    /**
     * - ���� KG�̴Ͻý�, KCP, �佺���̸���, ���̽����̸���, KICC, �ٳ� 6�� PG�翡 ���ؼ��� ī��� ����â direct ȣ���� �����մϴ�.
     * - �Ϻ� PG���� ���, ��� �������̵� ���Ͽ� ī��� ����â direct ���� ����� �������� �ʽ��ϴ�. �ݵ�� ��Ʈ���� ���� ���� ������� �������̵� ī��� ����â direct ȣ���� �����ϵ��� ������ �Ǿ��ִ��� PG�翡 Ȯ���� �ʿ��մϴ�.
     */
    direct?: {
        /** ī��� ���������� ǥ�� �ڵ�.  {@link https://chaifinance.notion.site/53589280bbc94fab938d93257d452216?v=eb405baf52134b3f90d438e3bf763630 ��ũ} ���� */
        code: string;
        /** �Һ� ���� ��. �Ͻú��� �� 0 ���� ����. */
        quota: number;
    };
    detail?: {
        /** �ݰ�� ī��� �ڵ� {@link https://chaifinance.notion.site/53589280bbc94fab938d93257d452216?v=eb405baf52134b3f90d438e3bf763630 ��ũ} ���� */
        card_code: string;
        /** �ش�ī�� Ȱ��ȭ ���� */
        enabled: boolean;
    }[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
    /**
     * ### PG�� �����ڵ�
     *
     * @example
     * PG���ڵ�.{����ID}
     */
    pg?: string;
    /**
     * ### �������� �����ڵ�
     * - PG�纰 �����Ǵ� ���������� ��� �����մϴ�.
     */
    pay_method: PaymentMethod;
    /**
     * ### ����ũ�� ����â Ȱ��ȭ ����
     * - �Ϻ� PG�縸 �����˴ϴ�.
     * - ����ũ�� ������ PG��� ���� ���� ����Ǿ�� �ϴ��� �����ϼ���
     */
    escrow?: boolean;
    /**
     * ### ����ũ�� ���� ����
     * - ����ũ�� ����(escrow: true)�ÿ��� ��ȿ�ϰ�, �ʼ� ���� �ƴմϴ�.
     * - �佺���̸��� �Ÿ�� (pg: tosspayments.~)�ÿ��� ��ȿ�մϴ�
     */
    escrowProducts?: EscrowProduct[];
    /**
     * ### ������ �ֹ���ȣ
     * - �ֹ���ȣ�� �� ���� ��û�� �����ϰ� ä�� �Ǿ�� �մϴ�.
     * - 40Byte �̳��� �ۼ����ּ���
     * - ���� ���οϷ� ó���� �ֹ���ȣ�� �����ϰ� �� ������ �������� ó�� �˴ϴ�.
     */
    merchant_uid: string;
    /**
     * ### ������� ��ǰ��
     * - 16byte �̳��� �ۼ����ּ���
     */
    name?: string;
    /**
     * �����ݾ�
     */
    amount: number;
    /**
     * ### ����� ���� ����Ÿ
     * - ���� ����� echo �� �޾ƺ��Ǽ� �ִ� �ʵ� �Դϴ�.
     * - JSON notation(string)���� ����˴ϴ�.
     * - �ֹ� �ǿ� ���� �ΰ������� ������ ������ �ʿ��� �� ����մϴ�
     */
    custom_data?: Record<any, any>;
    /**
     * ### �鼼�ݾ�
     * - ���� �ݾ� �� �鼼�ݾ׿� �ش��ϴ� �ݾ��� �Է��մϴ�.
     */
    tax_free?: number;
    /**
     * ### �ΰ���
     * - ���� �ݾ� �� �ΰ���(�⺻��: null)
     * - �����Ǵ� PG��
     *   - ���̽����̸���
     */
    vat_amount?: number | null;
    /**
     * ### ������ȭ �����ڵ�
     * - PayPal�� ��ȭ(KRW) �� �������� USD�� �⺻
     * - PayPal���� �����ϴ� ��ȭ�� {@link https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/ PayPal ���� ��ȭ} ����
     */
    currency?: string;
    /** ### ����â ��� ���� (�������� ���� �Ϻ� PG�� ����) */
    language?: "en" | "ko";
    /** ### �ֹ��ڸ� */
    buyer_name?: string;
    /**
     * ### �ֹ��� ����ó
     * - �Ϻ� PG�翡�� �ش� �ʵ� ������ ���� �߻�
     */
    buyer_tel?: string;
    /**
     * ### �ֹ��� �̸���
     * - �Ϻ� PG�翡�� �ش� �ʵ� ������ ���� �߻�(���̸�Ʈ��)
     */
    buyer_email?: string;
    /**
     * ### �ֹ��� �ּ�
     */
    buyer_addr?: string;
    /**
     * ### �ֹ��� �����ȣ
     */
    buyer_postcode?: string;
    /**
     * ### confirm_process ��� �� ������ endpoint url ����
     * - ������� ���Ϸ� ���� ��û�� �ʿ��մϴ�. (support@portone.io)
     */
    confirm_url?: string;
    /**
     * ### ����(Webhook) ���� �ּ�
     * - ��Ʈ�� ������ �ֿܼ� ������ ���� �ּҴ�� ����� ���� �ּҸ� �����ø��� ������ �� �ֽ��ϴ�.
     * - �ش� �� ������ ������ �ֿܼ� ������ �ּҷδ� ���Ź߼��� ���� �ʴ��� �����Ͻñ� �ٶ��ϴ�.
     */
    notice_url?: string | string[];
    /**
     * ### ������ ���� ����Ű
     * - ������ ���� �̿�� ����Ű�� 1:1�� ���εǴ� ������ ���� �� ����Ű�Դϴ�.
     */
    customer_uid?: string;
    display?: Display;
    card?: Card;
}

export interface RequestPayAdditionalResponse {
    /**
     * ### �ſ�ī�� ���ι�ȣ
     * - �ſ�ī�� �������ܿ� ���Ͽ� ����
     */
    apply_num?: string;
    /**
     * ### ������� �Ա� ���¹�ȣ
     * - PG��κ��� ���޵� ���� �״�� ������ ���� ���� �� dash(-) �Ǵ� ��Ÿ ��ȣ�� ���ԵǾ� ���� �� ����
     */
    vbank_num?: string;
    /**
     * ### ������� �Ա����� ��
     */
    vbank_name?: string;
    /**
     * ### ������� ������
     * - ���� ����ڸ����� ǥ�õ�, ��, �Ϻ� PG���� ��� null �� ��ȯ�ϹǷ� ��ü ó�� �ʿ�
     */
    vbank_holder?: string | null;
    /**
     * ### ������� �Աݱ��� (UNIX timestamp)
     */
    vbank_date?: string;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
    /**
     * ### ���� ��������
     * - �������� Ȥ�� ������� �߱��� ������ ���, True\
     * - PG��/�������ܿ� ���� imp_success�� ��ȯ��
     */
    success?: boolean;
    /**
     * ### ���� �����ڵ�
     * - ������ �����ϴ� ��� PG�� ��õ�ڵ尡 �������ϴ�.
     */
    error_code?: string;
    /**
     * ### ���� ���и޼���
     * - ������ �����ϴ� ��� PG�� ��õ�޼����� �������ϴ�.
     */
    error_msg?: string;
    /**
     * ### ��Ʈ�� ���� ������ȣ
     * - success�� false�̰� ���� validation�� ������ ���, imp_uid�� null�� �� ����
     */
    imp_uid?: string | null;
    /** ### �ֹ���ȣ */
    merchant_uid: string;
    /** ### �������� �����ڵ� */
    pay_method?: PaymentMethod;
    /** �����ݾ� */
    paid_amount?: number;
    /** �������� */
    status?: string;
    /** �ֹ��ڸ� */
    name?: string;
    /** PG�� �����ڵ� */
    pg_provider?: PG;
    /**
     * ### ������� �����ڵ�
     * - ����â���� ������� ȣ��� ���� ���ε� PG�� �����ڵ�
     * - �Ϻ� PG�� �Ǵ� ��������� ������ �߻����� ���� ��� �ش� �Ķ���ʹ� �����˴ϴ�.
     */
    embb_pg_provider?:
        | "naverpay"
        | "kakaopay"
        | "payco"
        | "samsungpay"
        | "ssgpay"
        | "lpay";
    /**
     * ### PG�� �ŷ���ȣ
     * - PG�翡�� �ŷ��� �����ϰ� �ο��ϴ� �ŷ���ȣ�Դϴ�.
     */
    pg_tid?: string;
    /** ### �ֹ��ڸ� */
    buyer_name?: string;
    /** ### �ֹ��� �̸��� */
    buyer_email?: string;
    /** ### �ֹ��� ����ó */
    buyer_tel?: string;
    /** ### �ֹ��� �ּ� */
    buyer_addr?: string;
    /** ### �ֹ��� �����ȣ */
    buyer_postcode?: string;
    /** ### ������ ���� ���� ������ */
    custom_data?: string;
    /** ### �������νð� (UNIX timestamp) */
    paid_at?: string;
    /** ### �ŷ� ������ǥ URL */
    receipt_url?: string;
}

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

type PaypalUI = "paypal-spb" | "paypal-rt";

export interface PaypalRequestPayParams extends RequestPayParams {
    pg: string;
    pay_method: "paypal";
    /**
     * ### �����ڵ�
     * - ����: ������ �Ϲݰ��� �׽�Ʈ ���ÿ��� ��ȿ
     */
    country?: string;
    /**
     * ### ������ �̸� ����:
     * - �����ȿ����� ��ȿ�ϸ� buyer_name�� �ƴ� buyer_first_name�� buyer_last_name �Է��� ����
     */
    buyer_first_name?: string;
    /**
     * ### ������ �̸� ����:
     * - �����ȿ����� ��ȿ�ϸ� buyer_name�� �ƴ� buyer_first_name�� buyer_last_name �Է��� ����
     */
    buyer_last_name?: string;
    /**
     * ### ���� ��ǰ ����
     * - ���� ��ǰ �� ������ �ǹ��ϸ� ���� �� �� �� name(��ǰ ��), quantity(��ǰ ����), unitPrice(��ǰ ���� �ݾ�)�� ����â�� ǥ��˴ϴ�.
     * - �������� �ش� �Ķ���� �Է��� ���� �����ϰ� ������, �ǵ��� �Է����ֽñ� �ٶ��ϴ�.
     * - �� ��ǰ�� ���� * ���� ������ �� ���� �ֹ� �� �ݾװ� �ݵ�� ��ġ�ؾ��մϴ�. ��ġ���� �ʴ� ��� ���� �޽����� ���ϵǸ鼭 ����â�� ȣ����� �ʽ��ϴ�.
     */
    products?: {
        id?: string;
        name?: string;
        code?: string;
        unitPrice?: number;
        quantity?: number;
        tag?: string;
    }[];
    /**
     * ### ���� ��ȭ
     * @default USD
     */
    currency?: string;
}

export interface Iamport {
    init: (accountID: string) => void;
    request_pay: (
        params: RequestPayParams,
        callback?: RequestPayResponseCallback
    ) => void;
    loadUI: (
        type: PaypalUI,
        params: PaypalRequestPayParams,
        callback?: RequestPayResponseCallback
    ) => void;
    updateLoadUIRequest: (
        type: PaypalUI,
        params: PaypalRequestPayParams
    ) => void;
}

declare global {
    interface Window {
        IMP?: Iamport;
    }
}
